import { Request } from '@loopback/rest';
import { inject, Provider, Getter } from '@loopback/context';
import { AuthorizationService } from '../services';
import { RolesMetadata, ROLES_METADATA } from '../types';

export class KeycloakAuthorizationService implements AuthorizationService {
  constructor(public getRolesMetadata: Getter<RolesMetadata>) {}

  async isAuthorized(request: Request): Promise<boolean> {
    const rolesMetadata = await this.getRolesMetadata();
    console.log('rolesMetadata', rolesMetadata);
    return !!rolesMetadata && !!request;
  }
}

export class KeycloakAuthorizationServiceProvider
  implements Provider<KeycloakAuthorizationService> {
  keycloakAuthorizationService: KeycloakAuthorizationService;

  constructor(
    @inject.getter(ROLES_METADATA)
    public getRolesMetadata: Getter<RolesMetadata>
  ) {
    this.keycloakAuthorizationService = new KeycloakAuthorizationService(
      this.getRolesMetadata
    );
  }

  value(): KeycloakAuthorizationService {
    return this.keycloakAuthorizationService;
  }
}
