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
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { User } from '../entities/user.entity';
import { CombinedAuthGuard } from '../guards/combined-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(CombinedAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.postsService.findAll({
      search: search || '',
      page: page ? parseInt(page, 10) : 1,
      pageSize: pageSize ? parseInt(pageSize, 10) : 10,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postsService.update(+id, updatePostDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postsService.remove(+id, user);
  }
}
