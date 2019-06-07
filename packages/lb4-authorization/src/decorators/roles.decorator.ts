import {
  MetadataInspector,
  Constructor,
  MethodDecoratorFactory
} from '@loopback/context';
import { RolesMetadata, AuthorizationBindings } from '../types';

export function roles(...roleNames: string[]) {
  return MethodDecoratorFactory.createDecorator<RolesMetadata>(
    AuthorizationBindings.Accessors.ROLES_METADATA,
    { roleNames }
  );
}

export function getRolesMetadata(
  controllerClass: Constructor<{}>,
  methodName: string
): RolesMetadata | undefined {
  return MetadataInspector.getMethodMetadata<RolesMetadata>(
    AuthorizationBindings.Accessors.ROLES_METADATA,
    controllerClass.prototype,
    methodName
  );
}
