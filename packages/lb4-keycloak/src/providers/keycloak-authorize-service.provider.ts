import { Provider, inject, BindingKey } from '@loopback/context';
import { Request } from '@loopback/rest';
import { AuthorizeService } from '../services/authorize.service';
import { ROLES_METADATA, RolesMetadata } from '../types';

export class KeycloakAuthorizeService implements AuthorizeService {
  constructor(public rolesMetadata: RolesMetadata) {}

  async isAuthorized(request: Request): Promise<boolean> {
    return !!request;
  }
}

export class KeycloakAuthorizeServiceProvider
  implements Provider<KeycloakAuthorizeService> {
  private keycloakAuthorizeService: KeycloakAuthorizeService;

  constructor(
    @inject(ROLES_METADATA)
    private rolesMetadata: RolesMetadata
  ) {
    this.keycloakAuthorizeService = new KeycloakAuthorizeService(
      this.rolesMetadata
    );
  }

  value(): KeycloakAuthorizeService {
    return this.keycloakAuthorizeService;
  }
}

export const KEYCLOAK_AUTHORIZE_SERVICE = BindingKey.create<
  KeycloakAuthorizeService
>('roles.keycloak-authorize-service');
