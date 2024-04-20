import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import * as process from 'process';

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  SwaggerModule.setup('api/v1', app, document);

  await app.listen(PORT);
  console.log('App is running on port ', PORT);
}
bootstrap();
