import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Store API')
  .setDescription('Store API 1.0')
  .setVersion('1.0')
  .setBasePath('api/v1')
  .addBearerAuth(undefined, 'defaultBearerAuth')
  .build();
