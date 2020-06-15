import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: string[]): any =>
  SetMetadata('permissions', permissions);
