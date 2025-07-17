import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('project/:id')
  FindTasks(@Param('id') id: string) {
    return this.tasksService.findTasksForProject(+id);
  }

  @Get('user/:id')
  FindUser(@Param('id') id: string) {
    return this.tasksService.findTasksForUser(+id);
  }
  @Get('/:project/:user')
  FindTasksForUser(
    @Param('project') project: string,
    @Param('user') user: string,
  ) {
    return this.tasksService.findTasksForProjectAndUser(+project, +user);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
