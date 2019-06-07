import {
  MetadataInspector,
  Constructor,
  MethodDecoratorFactory
} from '@loopback/context';
import { MetadataAccessor } from '@loopback/metadata';
import { RolesMetadata } from '../types';

export const ROLES_METADATA_ACCESSOR = MetadataAccessor.create<
  RolesMetadata,
  MethodDecorator
>('roles.roles-metadata-accesssor');

export function roles(...roleNames: string[]) {
  return MethodDecoratorFactory.createDecorator<RolesMetadata>(
    ROLES_METADATA_ACCESSOR,
    { roleNames }
  );
}

export function getRolesMetadata(
  controllerClass: Constructor<{}>,
  methodName: string
): RolesMetadata | undefined {
  return MetadataInspector.getMethodMetadata<RolesMetadata>(
    ROLES_METADATA_ACCESSOR,
    controllerClass.prototype,
    methodName
  );
}
