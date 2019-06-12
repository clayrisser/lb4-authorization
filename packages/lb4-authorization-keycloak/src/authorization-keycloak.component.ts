import { AuthorizationBindings } from 'lb4-authorization';
import { AuthorizationKeycloakBindings } from './types';
import { Component, ProviderMap } from '@loopback/core';
import {
  KeycloakAuthorizeActionProvider,
  KeycloakClientConfigProvider
} from './providers';

export class AuthorizationKeycloakComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      [AuthorizationBindings.Actions.AUTHORIZE
        .key]: KeycloakAuthorizeActionProvider,
      [AuthorizationKeycloakBindings.Providers.KEYCLOAK_CLIENT_CONFIG
        .key]: KeycloakClientConfigProvider
    };
  }
}
