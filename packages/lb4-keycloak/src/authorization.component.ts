import { Component, ProviderMap } from '@loopback/core';
import { ROLES_METADATA } from './types';
import { RolesMetadataProvider } from './providers';

export class AuthorizationComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      [ROLES_METADATA.key]: RolesMetadataProvider
    };
  }
}
