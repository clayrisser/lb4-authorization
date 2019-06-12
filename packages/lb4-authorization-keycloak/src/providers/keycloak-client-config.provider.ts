import { Provider } from '@loopback/context';
import { KeycloakClientConfig } from '../types';

export class KeycloakClientConfigProvider
  implements Provider<KeycloakClientConfig> {
  constructor() {}

  value(): KeycloakClientConfig {
    return {
      'auth-server-url': 'some-auth-server-url',
      'confidential-port': 8888,
      'ssl-required': 'some-ssl-required',
      'use-resource-role-mappings': true,
      realm: 'some-realm',
      resource: 'some-resource'
    };
  }
}
