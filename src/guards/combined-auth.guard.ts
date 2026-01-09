import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CombinedAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Tentar JWT primeiro
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const payload = jwt.verify(
          token,
          process.env.JWT_SECRET || 'secretkey',
        );
        console.log('✓ JWT válido:', payload);
        request.user = payload;
        return true;
      } catch (err) {
        console.log('JWT inválido, tentando API key...');
      }
    }

    // Tentar API key
    const apiKey = request.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;

    if (!apiKey) {
      throw new UnauthorizedException('JWT ou API Key obrigatória');
    }

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('API Key inválida');
    }

    console.log('✓ API Key válida');
    return true;
  }
}
