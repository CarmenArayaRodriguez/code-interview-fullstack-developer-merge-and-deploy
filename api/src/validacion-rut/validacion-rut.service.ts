import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidacionRutService {
  dividirRut(rut: string, separador: string): string[] {
    rut = rut.replace(/[^0-9Kk-]/g, ''); //Elimina los caracteres que no están permitidos
    const rutDividido = rut.split(separador);
    return rutDividido;
  }

  private esFormatoValido(rut: string): boolean {
    return /^[0-9]{7,8}-[0-9Kk]$/.test(rut); //Se asegura de que la cadena tenga el formato de RUT
  }

  validarRut(rut: string): boolean {
    if (!this.esFormatoValido(rut)) {
      return false;
    }
    const rutDividido = this.dividirRut(rut, '-');
    const cuerpoRut = rutDividido[0];
    const digitoVerificador = rutDividido[1];

    return this.validarDigitoVerificador(cuerpoRut, digitoVerificador);
  }

  private validarDigitoVerificador(
    cuerpoRut: string,
    digitoVerificador: string,
  ): boolean {
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpoRut.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpoRut[i], 10); //Se añade para idicar que es de base 10
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

    return digitoVerificador.toUpperCase() === digitoVerificadorEsperado;
  }
}