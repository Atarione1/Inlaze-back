import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectModule } from './project/project.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, ProjectModule, UsersModule, CommentsModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
