import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

// Controlador para manejar las operaciones relacionadas con los comentarios
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Método para crear un nuevo comentario
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  // Método para obtener todos los comentarios
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  // Método para obtener un comentario específico por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findTasks(+id);
  }

  // Método para actualizar un comentario existente
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  // Método para eliminar un comentario
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
