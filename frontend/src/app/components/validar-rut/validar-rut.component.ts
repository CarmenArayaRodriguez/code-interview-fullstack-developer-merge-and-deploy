import { Component } from '@angular/core';
import { ValidarRutService } from '../../services/validar-rut.service';

@Component({
  selector: 'app-validar-rut',
  templateUrl: './validar-rut.component.html',
  styleUrls: ['./validar-rut.component.css']
})
export class ValidarRutComponent {
  rut: string = '';
  resultado: { valido: boolean } | null = null;
  advertencia: string | null = null;
  error: string | null = null;
  cargando: boolean = false;

  constructor(private validarRutService: ValidarRutService) { }

  onSubmit() {
    // Resetea advertencia y resultado
    this.advertencia = null;
    this.resultado = null;

    // Limpiar el RUT de puntos y guiones
    const rutLimpio = this.rut.replace(/[.\-]/g, '');

    // Verifica caracteres no permitidos
    if (!/^[0-9Kk]*$/.test(rutLimpio)) {
      this.advertencia = 'Solo se permiten números, guion y K.';
      return;
    }

    // Verifica formato del RUT
    if (!this.esFormatoValido(rutLimpio)) {
      this.advertencia = 'El formato del RUT no es válido. Debe tener 7-8 dígitos y un dígito verificador.';
      return;
    }

    this.cargando = true; // Inicia el spinner

    this.validarRutService.validarRut(rutLimpio).subscribe(
      (response) => {
        this.resultado = response;
        this.cargando = false;  // Detiene el spinner
      },
      (error) => {
        console.error('Error al validar RUT:', error);
        this.error = 'Error al procesar la validación del RUT.';
        this.cargando = false;  // Detiene el spinner
      }
    );
  }

  private esFormatoValido(rut: string): boolean {
    return /^[0-9]{7,8}[0-9Kk]$/.test(rut); // Se asegura de que la cadena tenga el formato de RUT
  }
}
