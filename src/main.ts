import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: '*', // Permite requisições de qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization,x-api-key',
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Aplicação rodando na porta ${process.env.PORT ?? 3000}`);
}
bootstrap().catch((error) =>
  console.error('Error starting application:', error),
);
