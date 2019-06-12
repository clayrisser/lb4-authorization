import Keycloak from 'keycloak-connect';
import { BindingKey } from '@loopback/context';
import { Request } from '@loopback/rest';
import { User as AuthorizationUser } from 'lb4-authorization';

export namespace AuthorizationKeycloakBindings {
  export namespace Providers {
    export const KEYCLOAK_CLIENT_CONFIG = BindingKey.create<
      KeycloakClientConfig
    >('lb4-keycloak-authorization.providers.keycloak-client-config');
  }
}

export interface AccessToken {
  content: KeycloakTokenContent | null;
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

export interface KeycloakRequest extends Request {
  kauth: { grant?: { access_token: AccessToken | null } };
}

export interface KeycloakTokenContent extends Keycloak.TokenContent {
  email: string;
  exp: number;
  family_name: string;
  given_name: string;
  groups: any;
  realm_access?: { roles?: string[] | undefined } | undefined;
  resource_access?: any;
  sub: string;
}

export interface User extends AuthorizationUser {
  id: string;
  name?: string;
  email?: string;
  teams?: Array<string>;
  attributes?: { [key: string]: any };
}
