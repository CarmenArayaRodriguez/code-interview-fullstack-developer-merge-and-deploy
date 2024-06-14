import { Module } from '@nestjs/common';
import { ValidacionRutController } from './validacion-rut.controller';
import { ValidacionRutService } from './validacion-rut.service';

@Module({
  controllers: [ValidacionRutController],
  providers: [ValidacionRutService],
})
// eslint-disable-next-line prettier/prettier
export class ValidacionRutModule { }
