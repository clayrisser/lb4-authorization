import { Request } from '@loopback/rest';
import { inject, Provider, Getter } from '@loopback/context';
import {
  AuthorizationBindings,
  AuthorizeAction,
  RolesMetadata
} from '../types';

export class KeycloakAuthorizeActionProvider
  implements Provider<AuthorizeAction> {
  constructor(
    @inject.getter(AuthorizationBindings.Metadata.ROLES)
    public getRolesMetadata: Getter<RolesMetadata>
  ) {}

  value(): AuthorizeAction {
    return (request: Request) => this.action(request);
  }

  async action(request: Request): Promise<boolean> {
    const rolesMetadata = await this.getRolesMetadata();
    console.log('rolesMetadata', rolesMetadata);
    return !!rolesMetadata && !!request;
  }
}
