import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOneName(name: string) {
    return this.prismaService.user.findUnique({
      where: {
        name,
      },
    });
  }

  async findOne(id: number) {
    const projectFound = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!projectFound) {
      throw new NotFoundException('el usuario no fue encontrado');
    }
    return projectFound;
  }

  async remove(id: number) {
    const projectDelete = await this.prismaService.project.delete({
      where: {
        id: id,
      },
    });
    if (!projectDelete) {
      throw new NotFoundException(`el usuario ${id} no fue encontrado `);
    }
    return projectDelete;
  }
}
