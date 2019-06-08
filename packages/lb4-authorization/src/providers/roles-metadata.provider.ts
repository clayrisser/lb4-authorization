import { Constructor, inject, Provider } from '@loopback/context';
import { CoreBindings } from '@loopback/core';
import { RolesMetadata } from '../types';
import { getRolesMetadata } from '../decorators';

export class RolesMetadataProvider
  implements Provider<RolesMetadata | undefined> {
  constructor(
    @inject(CoreBindings.CONTROLLER_CLASS, { optional: true })
    private readonly controllerClass?: Constructor<{}>,
    @inject(CoreBindings.CONTROLLER_METHOD_NAME, { optional: true })
    private readonly methodName?: string
  ) {}

  value(): RolesMetadata | undefined {
    if (!this.controllerClass || !this.methodName) return undefined;
    return getRolesMetadata(this.controllerClass, this.methodName);
  }
}
