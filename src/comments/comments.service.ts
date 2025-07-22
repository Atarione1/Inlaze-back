import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  // Método para crear un nuevo comentario en la base de datos
  create(createCommentDto: CreateCommentDto) {
    return this.prismaService.comments.create({ data: createCommentDto });
  }

  // Método para obtener todos los comentarios de la base de datos
  findAll() {
    return this.prismaService.comments.findMany();
  }

  // Método para encontrar comentarios asociados a una tarea específica
  async findTasks(id: number) {
    const commentsFound = await this.prismaService.comments.findMany({
      where: {
        taskId: id, // Filtra los comentarios por el ID de la tarea
      },
    });
    if (!commentsFound) {
      throw new NotFoundException('el comentario no fue encontrado');
    }
    return commentsFound; // Devuelve los comentarios encontrados
  }

  // Método para encontrar un comentario específico por su ID
  async findOne(id: number) {
    const commentFound = await this.prismaService.comments.findUnique({
      where: {
        id: id, // Busca el comentario por su ID
      },
    });
    if (!commentFound) {
      throw new NotFoundException('el comentario no fue encontrado');
    }
    return commentFound; // Devuelve el comentario encontrado
  }

  // Método para actualizar un comentario específico por su ID
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const commentFound = await this.prismaService.comments.update({
      where: {
        id, // Busca el comentario por su ID
      },
      data: updateCommentDto, // Actualiza los datos del comentario
    });
    if (!commentFound) {
      throw new NotFoundException(`el comentario ${id} no fue encontrado`);
    }
    return commentFound; // Devuelve el comentario actualizado
  }

  // Método para eliminar un comentario específico por su ID
  async remove(id: number) {
    const commentDelete = await this.prismaService.comments.delete({
      where: {
        id: id, // Busca el comentario por su ID
      },
    });
    if (!commentDelete) {
      throw new NotFoundException(`el comentario ${id} no fue encontrado`);
    }
    return commentDelete; // Devuelve el comentario eliminado
  }
}
