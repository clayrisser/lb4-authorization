import { KeycloakClientConfig } from 'lb4-authorization-keycloak';
import { Provider } from '@loopback/context';

export class KeycloakClientConfigProvider
  implements Provider<KeycloakClientConfig> {
  constructor() {}

  value(): KeycloakClientConfig {
    return {
      'auth-server-url': 'http://localhost:8080/auth',
      'confidential-port': 0,
      'ssl-required': 'external',
      'use-resource-role-mappings': true,
      realm: 'loopback',
      resource: 'loopback'
    };
  }
}
