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

  app.enableCors(); // Habilita CORS para todas las rutas y todos los orígenes
  await app.listen(3000);
}

bootstrap();
