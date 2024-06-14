import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rut } from './entities/rut.entity';
import { Repository } from 'typeorm';
import logger from '../utils/logger';

@Injectable()
export class ValidacionRutService {
  constructor(
    @InjectRepository(Rut)
    private readonly rutRepository: Repository<Rut>,
    // eslint-disable-next-line prettier/prettier
  ) { }

  private limpiarRut(rut: string): string {
    const rutLimpio = rut.replace(/[.\-]/g, ''); // Elimina los caracteres que no están permitidos
    logger.info('RUT después de limpiar:', rutLimpio);
    return rutLimpio;
  }

  private esFormatoValido(rut: string): boolean {
    const formatoValido = /^[0-9]{7,8}[0-9Kk]$/.test(rut); // Se asegura de que la cadena tenga el formato de RUT
    logger.info('RUT es de formato válido:', formatoValido, 'para RUT:', rut); // Muestra si el formato es válido
    return formatoValido;
  }

  async validarRut(rut: string): Promise<{ valido: boolean }> {
    rut = this.limpiarRut(rut); // Limpia primero el RUT
    if (!this.esFormatoValido(rut)) {
      logger.warn('Falló la validación de formato para:', rut); // Registra cuando un RUT falla la validación de formato
      return { valido: false };
    }
    const cuerpoRut = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1);

    const esValido = this.validarDigitoVerificador(
      cuerpoRut,
      digitoVerificador,
    );

    // Guarda la validación en la base de datos
    const nuevaRut = this.rutRepository.create({
      cuerpo: cuerpoRut,
      digitoVerificador,
      valido: esValido,
    });
    await this.rutRepository.save(nuevaRut);

    return { valido: esValido };
  }

  private validarDigitoVerificador(
    cuerpoRut: string,
    digitoVerificador: string,
  ): boolean {
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpoRut.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpoRut[i], 10); // Se añade para indicar que es de base 10
      if (multiplo === 7) {
        multiplo = 2;
      } else {
        multiplo += 1;
      }
    }

    const digitoEsperado = 11 - (suma % 11);
    let digitoVerificadorEsperado;

    if (digitoEsperado === 10) {
      digitoVerificadorEsperado = 'K';
    } else if (digitoEsperado === 11) {
      digitoVerificadorEsperado = '0';
    } else {
      digitoVerificadorEsperado = digitoEsperado.toString();
    }
    logger.info(
      'Calculado DV:',
      digitoVerificadorEsperado,
      'Real DV:',
      digitoVerificador.toUpperCase(),
    ); // Muestra el cálculo del DV
    return digitoVerificador.toUpperCase() === digitoVerificadorEsperado;
  }
}
