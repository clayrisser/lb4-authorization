import { BindingKey } from '@loopback/context';
import { MetadataAccessor } from '@loopback/metadata';

export type RolesMetadata = string[];

export const ROLES_METADATA = BindingKey.create<RolesMetadata | undefined>(
  'roles.roles-metadata'
);

export const ROLES_METADATA_ACCESSOR = MetadataAccessor.create<
  RolesMetadata,
  MethodDecorator
>('roles.roles-metadata-accesssor');
