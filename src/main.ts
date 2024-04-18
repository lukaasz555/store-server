import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  ),
    await app.listen(PORT);
  console.log('App is running on port ', PORT);
}
bootstrap();
