import { AuthorizationBindings } from 'lb4-authorization';
import { Component, ProviderMap } from '@loopback/core';
import { KeycloakAuthorizeActionProvider } from './providers';

export class AuthorizationKeycloakComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      [AuthorizationBindings.Actions.AUTHORIZE
        .key]: KeycloakAuthorizeActionProvider
    };
  }
}
