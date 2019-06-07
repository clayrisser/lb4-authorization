import {
  MetadataInspector,
  Constructor,
  MethodDecoratorFactory
} from '@loopback/context';
import { ROLES_METADATA_KEY, RolesMetadata } from '../types';

export function roles(...roleNames: string[]) {
  return MethodDecoratorFactory.createDecorator<RolesMetadata>(
    ROLES_METADATA_KEY,
    roleNames
  );
}

export function getRolesMetadata(
  controllerClass: Constructor<{}>,
  methodName: string
): RolesMetadata | undefined {
  return MetadataInspector.getMethodMetadata<RolesMetadata>(
    ROLES_METADATA_KEY,
    controllerClass.prototype,
    methodName
  );
}
