import { Component, ProviderMap } from '@loopback/core';
import { AUTHORIZE_ACTION } from './types';
import { AuthorizeActionProvider } from './providers';

export class AuthenticationComponent implements Component {
  providers: ProviderMap;

  constructor() {
    this.providers = {
      [AUTHORIZE_ACTION.key]: AuthorizeActionProvider
    };
  }
}
