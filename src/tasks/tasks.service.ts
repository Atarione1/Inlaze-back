import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({ data: createTaskDto });
  }

  findAll() {
    return this.prismaService.task.findMany();
  }
  async findTasksForProject(project: number) {
    const tasks = await this.prismaService.task.findMany({
      where: {
        projectId: project,
      },
    });
    return tasks;
  }
  async findTasksForProjectAndUser(project: number, user: number) {
    const tasks = await this.prismaService.task.findMany({
      where: {
        projectId: project,
        userId: user,
      },
    });
    return tasks;
  }
  async findTasksForUser(user: number) {
    const tasks = await this.prismaService.task.findMany({
      where: {
        userId: user,
      },
    });
    return tasks;
  }

  async findOne(id: number) {
    const projectFound = await this.prismaService.task.findUnique({
      where: {
        id: id,
      },
    });
    if (!projectFound) {
      throw new NotFoundException('la tarea no fue encontrado');
    }
    return projectFound;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const projectFound = await this.prismaService.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
    if (!projectFound) {
      throw new NotFoundException(`la tarea ${id} no fue encontrado `);
    }
    return projectFound;
  }

  async remove(id: number) {
    const projectDelete = await this.prismaService.task.delete({
      where: {
        id: id,
      },
    });
    if (!projectDelete) {
      throw new NotFoundException(`la tarea ${id} no fue encontrado `);
    }
    return projectDelete;
  }
}
