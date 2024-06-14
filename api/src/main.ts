import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLoggerService } from './utils/logger.service';

async function bootstrap() {
  // Crea la aplicación Nest y configurar el logger global
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Validación de RUT')
    .setDescription('Documentación de la API para validar RUT')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // La URL del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
