import { BindingKey } from '@loopback/context';
import { MetadataAccessor } from '@loopback/metadata';
import { RequestContext } from '@loopback/rest';

export type RolesMetadata = { roleNames: string[] };

export type AuthorizeAction = (context: RequestContext) => Promise<boolean>;

export interface User {}

export namespace AuthorizationBindings {
  export namespace Accessors {
    export const ROLES_METADATA = MetadataAccessor.create<
      RolesMetadata,
      MethodDecorator
    >('lb4-authorization.accessors.roles-metadata');
  }
  export namespace Providers {
    export const AUTHORIZE_ACTION = BindingKey.create<AuthorizeAction>(
      'lb4-authorization.providers.authorize-action'
    );
    export const CURRENT_USER = BindingKey.create<User>(
      'lb4-authorization.providers.current-user'
    );
    export const ROLES_METADATA = BindingKey.create<RolesMetadata | undefined>(
      'lb4-authorization.providers.roles-metadata'
    );
  }
}
