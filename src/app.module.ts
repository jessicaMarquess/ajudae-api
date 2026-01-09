import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApiController } from './controllers/api.controller';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';
import { CombinedAuthGuard } from './guards/combined-auth.guard';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ajudae_db',
      entities: [User, Post],
      synchronize: true, // Apenas para desenvolvimento
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Post]),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, CombinedAuthGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
