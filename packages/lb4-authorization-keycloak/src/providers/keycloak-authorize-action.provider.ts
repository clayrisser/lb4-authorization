import Keycloak from 'keycloak-connect';
import cookieSession from 'cookie-session';
import { RequestContext, Request, Response } from '@loopback/rest';
import { inject, Provider, Getter } from '@loopback/context';
import { oc } from 'ts-optchain.macro';
import {
  AuthorizationBindings,
  AuthorizeAction,
  RolesMetadata
} from 'lb4-authorization';
import MiddlewareRunner, {
  NextFunction,
  RequestHandler
} from 'middleware-runner';
import {
  AccessToken,
  AuthorizationKeycloakBindings,
  KeycloakClientConfig,
  KeycloakRequest,
  KeycloakTokenContent,
  User
} from '../types';

const { env } = process;

export class KeycloakAuthorizeActionProvider
  implements Provider<AuthorizeAction> {
  keycloak: Keycloak;

  constructor(
    @inject.getter(AuthorizationBindings.Metadata.ROLES)
    public getRolesMetadata: Getter<RolesMetadata>,
    @inject(AuthorizationKeycloakBindings.Config.KEYCLOAK_CLIENT_CONFIG, {
      optional: true
    })
    public keycloakClientConfig?: KeycloakClientConfig
  ) {
    this.keycloak = new Keycloak({}, keycloakClientConfig || {});
  }

  value(): AuthorizeAction {
    return (context: RequestContext) => this.action(context);
  }

  userMiddleware(request: Request, _response: Response, next: NextFunction) {
    const keycloakRequest = request as KeycloakRequest;
    const accessToken: AccessToken | null = oc(
      keycloakRequest
    ).kauth.grant.access_token(null);
    if (!accessToken) {
      throw Error(
        `No access token provided in grant. Grant:" ${JSON.stringify(
          oc(keycloakRequest).kauth.grant({ access_token: { content: null } })
        )}`
      );
    }
    const tokenContent: KeycloakTokenContent = accessToken.content as KeycloakTokenContent;
    if (!tokenContent) {
      throw Error(
        `No content provided in access token. Access token:" ${JSON.stringify(
          accessToken
        )}`
      );
    }
    const user: User = {
      email: tokenContent.email,
      id: tokenContent.sub,
      name: `${tokenContent.given_name} ${tokenContent.family_name}`,
      teams: tokenContent.groups
    };
    return next(null, user);
  }

  async action(context: RequestContext): Promise<boolean> {
    const { request, response } = context;
    const rolesMetadata = await this.getRolesMetadata();
    const middlewareRunner = new MiddlewareRunner([
      cookieSession({
        secret: env.COOKIE_SECRET,
        name: 'keycloak_grant',
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 3600000
      }),
      (this.keycloak.middleware({
        logout: '/logout'
      }) as unknown) as Array<RequestHandler>,
      this.keycloak.protect(),
      this.userMiddleware
    ]);
    const result = await middlewareRunner.run(request, response);
    console.log('result', result);
    console.log('rolesMetadata', rolesMetadata);
    return !!rolesMetadata && !!context;
  }
}
