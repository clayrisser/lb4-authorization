import { BindingKey } from '@loopback/context';
import { MetadataAccessor } from '@loopback/metadata';
import { Request } from '@loopback/rest';

export type RolesMetadata = { roleNames: string[] };

export type AuthorizeAction = (request: Request) => Promise<boolean>;

export namespace AuthorizationBindings {
  export namespace Accessors {
    export const ROLES_METADATA = MetadataAccessor.create<
      RolesMetadata,
      MethodDecorator
    >('lb4-authorization.accessors.roles-metadata');
  }
  export namespace Metadata {
    export const ROLES = BindingKey.create<RolesMetadata | undefined>(
      'lb4-authorization.metadata.roles'
    );
  }
  export namespace Actions {
    export const AUTHORIZE = BindingKey.create<AuthorizeAction>(
      'lb4-authorization.actions.authorize'
    );
  }
}
