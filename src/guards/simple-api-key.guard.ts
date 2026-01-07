import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class SimpleApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: { [key: string]: string };
      user?: User;
    }>();

    // Verificar se tem API Key no header
    const apiKey = request.headers['x-api-key'] || request.headers['api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API Key é obrigatória');
    }

    // Verificar se é a API Key válida
    const validApiKey = this.configService.get<string>('API_KEY');
    if (!validApiKey) {
      throw new UnauthorizedException('API Key não configurada no servidor');
    }

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('API Key inválida');
    }

    // Buscar um professor para usar como usuário padrão
    const user = await this.userRepository.findOne({
      where: { email: 'prof.silva@escola.com' },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário padrão não encontrado');
    }

    // Adicionar o usuário na request
    request.user = user;

    return true;
  }
}
