import { Request } from '@loopback/rest';
import { RolesMetadata } from '../types';

export interface AuthorizeService {
  rolesMetadata: RolesMetadata;

  isAuthorized(request: Request): Promise<boolean>;
}
