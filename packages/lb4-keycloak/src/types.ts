import { BindingKey } from '@loopback/context';
import { AuthorizationService } from './services';

export type RolesMetadata = { roleNames: string[] };

export const ROLES_METADATA = BindingKey.create<RolesMetadata | undefined>(
  'authorization.metadata.roles'
);

export const AUTHORIZATION_SERVICE = BindingKey.create<AuthorizationService>(
  'authorization.services.authorization'
);
