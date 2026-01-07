import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRole } from '../entities/user.entity';
import { SimpleApiKeyGuard } from '../guards/simple-api-key.guard';
import { UsersService } from '../users/users.service';

@Controller('api')
@UseGuards(SimpleApiKeyGuard)
export class ApiController {
  constructor(private readonly usersService: UsersService) {}

  // Rotas para usuários
  @Get('users')
  findAllUsers(@Query('role') role?: UserRole) {
    if (role) {
      return this.usersService.findAllByRole(role);
    }
    return this.usersService.findAll();
  }

  @Get('users/professores')
  findAllProfessores() {
    return this.usersService.findAllByRole(UserRole.PROFESSOR);
  }

  @Get('users/alunos')
  findAllAlunos() {
    return this.usersService.findAllByRole(UserRole.ALUNO);
  }

  @Get('users/:id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('users')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('users/:id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Health check
  @Get('health')
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'API funcionando com API Key',
    };
  }
}
