import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isDevelopment } from './config/config';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  if (isDevelopment()) {
    const config = new DocumentBuilder()
      .setTitle('Testing')
      .setDescription('WEB PROGRAMMER Test - PT. Deptech Digital Indonesia')
      .setVersion('1.0')
      .addTag('api')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);
  }

  app.enableCors();

  await app.listen(5000);
}

bootstrap();
