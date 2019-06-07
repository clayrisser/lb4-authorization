import { Getter } from '@loopback/context';
import { Request } from '@loopback/rest';
import { RolesMetadata } from '../types';

export interface AuthorizationService {
  getRolesMetadata: Getter<RolesMetadata>;

  isAuthorized(request: Request): Promise<boolean>;
}
