import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidacionRutService {
  dividirRut(rut: string, separador: string): string[] {
    const rutDividido = rut.split(separador);
    return rutDividido;
  }

  imprimirRutDividido(rutDividido: string[]): void {
    for (let i = 0; i < rutDividido.length; i++) {
      console.log(rutDividido[i] + '-');
    }
  }
}

var rut = '12345656-9';
var separador = '-';
