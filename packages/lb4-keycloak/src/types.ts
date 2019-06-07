import { BindingKey } from '@loopback/context';
import { MetadataAccessor } from '@loopback/metadata';
import { Request } from '@loopback/rest';

export interface AuthorizeFn {
  (request: Request): Promise<object>;
}

export type RolesMetadata = string[];

export const AUTHORIZE_ACTION = BindingKey.create<AuthorizeFn>(
  'roles.actions.authorize'
);

export const ROLES_METADATA_KEY = MetadataAccessor.create<
  RolesMetadata,
  MethodDecorator
>('roles.metadata');
