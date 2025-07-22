// Guard para proteger rutas que requieren autenticación
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // Método principal que determina si se permite el acceso a la ruta protegida
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request); // Extrae el token del encabezado de la solicitud
    if (!token) {
      return false; // Si no hay token, deniega el acceso
    }
    try {
      // Verifica y decodifica el token utilizando el servicio JWT
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY, // Clave secreta para verificar el token
      });
      // Almacena la información del usuario en el objeto de solicitud
      request['user'] = payload;
    } catch {
      return false; // Si la verificación falla, deniega el acceso
    }
    return true; // Si todo es válido, permite el acceso
  }

  // Método para extraer el token del encabezado de autorización
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined; // Devuelve el token si el tipo es "Bearer"
  }
}
