import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    // Apenas professores podem criar posts
    if (user.role !== UserRole.PROFESSOR) {
      throw new ForbiddenException('Apenas professores podem criar posts');
    }

    const post = this.postRepository.create({
      ...createPostDto,
      authorId: user.id,
    });

    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<Post> {
    // Apenas professores podem atualizar posts
    if (user.role !== UserRole.PROFESSOR) {
      throw new ForbiddenException('Apenas professores podem editar posts');
    }

    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    // Professores só podem editar seus próprios posts
    if (post.authorId !== user.id) {
      throw new ForbiddenException('Você só pode editar seus próprios posts');
    }

    await this.postRepository.update(id, updatePostDto);
    return await this.findOne(id);
  }

  async remove(id: number, user: User): Promise<void> {
    // Apenas professores podem remover posts
    if (user.role !== UserRole.PROFESSOR) {
      throw new ForbiddenException('Apenas professores podem remover posts');
    }

    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    // Professores só podem remover seus próprios posts
    if (post.authorId !== user.id) {
      throw new ForbiddenException('Você só pode remover seus próprios posts');
    }

    await this.postRepository.delete(id);
  }
}
