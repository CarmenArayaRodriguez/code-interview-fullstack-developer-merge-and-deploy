import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidacionRutController } from './validacion-rut.controller';
import { ValidacionRutService } from './validacion-rut.service';
import { Rut } from './entities/rut.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rut])],
  controllers: [ValidacionRutController],
  providers: [ValidacionRutService],
})
// eslint-disable-next-line prettier/prettier
export class ValidacionRutModule { }
