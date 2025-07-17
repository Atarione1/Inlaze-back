import { User } from '@prisma/client';

export type LoginDto = Omit<User, 'id | admin'>;
