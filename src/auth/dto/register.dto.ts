import { User } from '@prisma/client';

export type RegisterDto = Omit<User, 'id'>;
