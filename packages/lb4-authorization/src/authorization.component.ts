import { Component, ProviderMap } from '@loopback/core';
import { AuthorizationBindings } from './types';
import { RolesMetadataProvider } from './providers';

export class AuthorizationComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      [AuthorizationBindings.Providers.ROLES_METADATA
        .key]: RolesMetadataProvider
    };
  }
}
