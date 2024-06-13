import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ValidacionRutService } from './validacion-rut.service';

@ApiTags('validacion')
@Controller()
export class ValidacionRutController {
  // eslint-disable-next-line prettier/prettier
  constructor(private validacionRutService: ValidacionRutService) { }

  @Post('/api/validation')
  @ApiOperation({
    summary: 'Valida un RUT chileno',
    description:
      'Valida si un RUT chileno es correcto según el dígito verificador.',
  })
  @ApiBody({
    description: 'Datos del RUT a validar',
    schema: { example: { rut: '11222333-9' } },
  })
  @ApiResponse({
    status: 200,
    description: 'RUT válido',
    schema: { example: { mensaje: 'El RUT es válido.', valido: true } },
  })
  @ApiResponse({
    status: 400,
    description: 'RUT inválido',
    schema: { example: { mensaje: 'El RUT es inválido.', valido: false } },
  })
  validarRut(@Body('rut') rut: string, @Res() res: Response): void {
    console.log('Recibido RUT para validación:', rut);
    if (!rut) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ mensaje: 'RUT es requerido', valido: false });
      return;
    }

    const esValido = this.validacionRutService.validarRut(rut);
    if (esValido) {
      res
        .status(HttpStatus.OK)
        .json({ mensaje: 'El RUT es válido.', valido: true });
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ mensaje: 'El RUT es inválido.', valido: false });
    }
  }
}
