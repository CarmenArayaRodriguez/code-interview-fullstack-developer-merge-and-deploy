import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidacionRutModule } from './validacion-rut/validacion-rut.module';

@Module({
  imports: [ValidacionRutModule],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
