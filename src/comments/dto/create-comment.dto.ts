import { Comments } from '@prisma/client';

export type CreateCommentDto = Omit<Comments, 'id'>;
