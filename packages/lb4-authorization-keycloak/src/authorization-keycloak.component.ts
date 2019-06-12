import { AuthorizationBindings } from 'lb4-authorization';
import { Component, ProviderMap } from '@loopback/core';
import { AuthorizationKeycloakBindings } from './types';
import {
  KeycloakAuthorizeActionProvider,
  KeycloakClientConfigProvider
} from './providers';

export class AuthorizationKeycloakComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      [AuthorizationBindings.Providers.AUTHORIZE_ACTION
        .key]: KeycloakAuthorizeActionProvider,
      [AuthorizationKeycloakBindings.Providers.KEYCLOAK_CLIENT_CONFIG
        .key]: KeycloakClientConfigProvider
    };
  }
}
