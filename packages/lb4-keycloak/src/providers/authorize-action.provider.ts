import { Provider } from '@loopback/context';
import { Request } from '@loopback/rest';
import { AuthorizeFn } from '../types';

export class AuthorizeActionProvider implements Provider<AuthorizeFn> {
  value(): AuthorizeFn {
    return async (request: Request) => request;
  }
}
