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
import { CombinedAuthGuard } from '../guards/combined-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(CombinedAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: UserRole) {
    if (role) {
      return this.usersService.findAllByRole(role);
    }
    return this.usersService.findAll();
  }

  @Get('professores')
  findAllProfessores() {
    return this.usersService.findAllByRole(UserRole.PROFESSOR);
  }

  @Get('alunos')
  findAllAlunos() {
    return this.usersService.findAllByRole(UserRole.ALUNO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
