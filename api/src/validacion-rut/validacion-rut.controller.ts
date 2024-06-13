import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { ValidacionRutService } from './validacion-rut.service';

@Controller()
export class ValidacionRutController {
  // eslint-disable-next-line prettier/prettier
  constructor(private validacionRutService: ValidacionRutService) { }

  @Post('/api/validation')
  validarRut(@Body('rut') rut: string): { valido: boolean } {
    console.log('Recibido RUT para validación:', rut);
    console.log('RUT recibido después de limpiar:', rut);
    if (!rut) {
      throw new HttpException('RUT es requerido', HttpStatus.BAD_REQUEST);
    }
    if (!this.validacionRutService.validarRut(rut)) {
      throw new HttpException('RUT inválido', HttpStatus.BAD_REQUEST);
    }
    return { valido: true };
  }
}
