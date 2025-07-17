import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    return this.prismaService.comments.create({ data: createCommentDto });
  }

  findAll() {
    return this.prismaService.comments.findMany();
  }
  async findTasks(id: number) {
    const commentsFound = await this.prismaService.comments.findMany({
      where: {
        taskId: id,
      },
    });
    if (!commentsFound) {
      throw new NotFoundException('el comentario no fue encontrado');
    }
    return commentsFound;
  }

  async findOne(id: number) {
    const commentFound = await this.prismaService.comments.findUnique({
      where: {
        id: id,
      },
    });
    if (!commentFound) {
      throw new NotFoundException('el comentario no fue encontrado');
    }
    return commentFound;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const commentFound = await this.prismaService.comments.update({
      where: {
        id,
      },
      data: updateCommentDto,
    });
    if (!commentFound) {
      throw new NotFoundException(`el comentario ${id} no fue encontrado`);
    }
    return commentFound;
  }

  async remove(id: number) {
    const commentDelete = await this.prismaService.comments.delete({
      where: {
        id: id,
      },
    });
    if (!commentDelete) {
      throw new NotFoundException(`el comentario ${id} no fue encontrado`);
    }
    return commentDelete;
  }
}
