import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProjectsDto } from './dto/getall-project.dto';

// Servicio para manejar la lógica de negocio relacionada con los proyectos
@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}
  // Crear un nuevo proyecto
  create(createProjectDto: CreateProjectDto) {
    return this.prismaService.project.create({ data: createProjectDto });
  }

  // Obtener todos los proyectos con paginación y filtrado por nombre
  findAll(query: GetAllProjectsDto) {
    const { name, order } = query;
    const take = query.take ? parseInt(query.take) : 10;
    const page = query.page ? parseInt(query.page) : 1;
    const skip = (page - 1) * take;
    const proyectsPaginated = this.prismaService.project.findMany({
      take,
      skip,
      where: { name: { contains: name } },
    });
    console.log(proyectsPaginated);
    return proyectsPaginated;
  }

  // Encontrar un proyecto por su ID
  async findOne(id: number) {
    const projectFound = await this.prismaService.project.findUnique({
      where: {
        id: id,
      },
    });
    if (!projectFound) {
      throw new NotFoundException('el projecto no fue encontrado');
    }
    return projectFound;
  }

  // Actualizar un proyecto existente
  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const projectFound = await this.prismaService.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });
    if (!projectFound) {
      throw new NotFoundException(`el projecto ${id} no fue encontrado `);
    }
    return projectFound;
  }

  // Eliminar un proyecto
  async remove(id: number) {
    const projectDelete = await this.prismaService.project.delete({
      where: {
        id,
      },
    });
    if (!projectDelete) {
      throw new NotFoundException(`el projecto ${id} no fue encontrado `);
    }
    return projectDelete;
  }
}
