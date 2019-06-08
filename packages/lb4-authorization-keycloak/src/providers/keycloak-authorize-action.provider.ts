import Keycloak from 'keycloak-connect';
import cookieSession from 'cookie-session';
import { RequestContext, Request, Response } from '@loopback/rest';
import { inject, Provider, Getter } from '@loopback/context';
import {
  AuthorizationBindings,
  AuthorizeAction,
  RolesMetadata
} from 'lb4-authorization';
import MiddlewareRunner, {
  NextFunction,
  RequestHandler
} from 'middleware-runner';

const { env } = process;

export class KeycloakAuthorizeActionProvider
  implements Provider<AuthorizeAction> {
  keycloak: Keycloak;

  constructor(
    @inject.getter(AuthorizationBindings.Metadata.ROLES)
    public getRolesMetadata: Getter<RolesMetadata>
  ) {
    this.keycloak = new Keycloak({}, {});
  }

  value(): AuthorizeAction {
    return (context: RequestContext) => this.action(context);
  }

  userMiddleware(request: Request, response: Response, next: NextFunction) {
    return next(request, response);
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

export interface Credentials {
  secret: string;
}

export interface KeycloakClientConfig {
  realm: string;
  'auth-server-url': string;
  'ssl-required': string;
  resource: string;
  credentials?: Credentials;
  'use-resource-role-mappings': boolean;
  'confidential-port': number;
}
