import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

// Servicio para manejar la lógica de negocio relacionada con la autenticación
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register({ name, password, admin }: RegisterDto) {
    const user = await this.userService.findOneName(name);
    if (user) {
      throw new BadRequestException('usuario ya existe');
    }
    return await this.userService.create({
      name,
      password: await bcryptjs.hash(password, 10),
      admin,
    });
  }

  // Método para iniciar sesión un usuario existente
  async login({ name, password }: LoginDto) {
    const user = await this.userService.findOneName(name);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }
    const ispassword = await bcryptjs.compare(password, user.password);
    if (!ispassword) {
      throw new UnauthorizedException('Credenciales no validas');
    }
    const Payload = { name: user.name };

    const token = await this.jwtService.signAsync(Payload);
    return {
      token,
      name,
    };
  }

  // Método para validar un token JWT
  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
