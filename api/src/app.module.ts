import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidacionRutController } from './validacion-rut/validacion-rut.controller';
import { ValidacionRutService } from './validacion-rut/validacion-rut.service';

@Module({
  imports: [],
  controllers: [AppController, ValidacionRutController],
  providers: [AppService, ValidacionRutService],
})
export class AppModule {}
