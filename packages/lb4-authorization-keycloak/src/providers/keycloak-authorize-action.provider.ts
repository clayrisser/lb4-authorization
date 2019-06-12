import Keycloak from 'keycloak-connect';
import cookieSession from 'cookie-session';
import { RequestContext, Request, Response } from '@loopback/rest';
import { inject, Provider, Getter, Setter } from '@loopback/context';
import { oc } from 'ts-optchain';
import {
  AuthorizationBindings,
  AuthorizeAction,
  RolesMetadata
} from 'lb4-authorization';
import {
  Middleware,
  MiddlewareChain,
  NextFunction,
  runMiddleware
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
  cookieMiddleware: Middleware;

  keycloak: Keycloak;

  keycloakMiddleware: Middleware;

  constructor(
    @inject.getter(AuthorizationBindings.Providers.ROLES_METADATA)
    public getRolesMetadata: Getter<RolesMetadata>,
    @inject.setter(AuthorizationBindings.Providers.CURRENT_USER)
    readonly setCurrentUser: Setter<User>,
    @inject(AuthorizationKeycloakBindings.Providers.KEYCLOAK_CLIENT_CONFIG, {
      optional: true
    })
    public keycloakClientConfig?: KeycloakClientConfig
  ) {
    this.keycloak = new Keycloak({}, keycloakClientConfig || {});
    this.cookieMiddleware = cookieSession({
      secret: env.COOKIE_SECRET || 'some-secret',
      name: 'keycloak_grant',
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    });
    this.keycloakMiddleware = (this.keycloak.middleware({
      logout: '/logout'
    }) as unknown) as Middleware;
  }

  value(): AuthorizeAction {
    return (context: RequestContext) => this.action(context);
  }

  async action(context: RequestContext): Promise<boolean> {
    const { request, response } = context;
    const rolesMetadata = await this.getRolesMetadata();
    const user = await runMiddleware<User>(request, response, [
      this.cookieMiddleware,
      this.keycloakMiddleware,
      this.getProtectMiddleware(rolesMetadata),
      this.userMiddleware
    ]);
    this.setCurrentUser(user);
    return !!user.id;
  }

  getProtectMiddleware(rolesMetadata: RolesMetadata): MiddlewareChain {
    return oc(rolesMetadata).roleNames([]).length
      ? oc(rolesMetadata)
          .roleNames([])
          .map(roleName => this.keycloak.protect(roleName))
      : this.keycloak.protect();
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
}
