import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const theConfigService = app.get<ConfigService>(ConfigService);
  const url: string = theConfigService.get('PROD_URL') ?? '';
  app.enableCors({
    origin: url,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port: number = theConfigService.get('PORT') ?? 3000;
  await app.listen(port ?? 8080);
}
bootstrap();
