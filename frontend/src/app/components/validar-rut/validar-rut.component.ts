import { Component } from '@angular/core';
import { ValidarRutService } from '../../services/validar-rut.service';

@Component({
  selector: 'app-validar-rut',
  templateUrl: './validar-rut.component.html',
  styleUrls: ['./validar-rut.component.css']
})
export class ValidarRutComponent {
  rut: string = '';
  advertencia: string | null = null;
  cargando: boolean = false;
  resultado: { valido: boolean; mensaje: string } | null = null;
  error: string | null = null;

  constructor(private validarRutService: ValidarRutService) { }

  onSubmit(): void {
    this.advertencia = null;
    this.resultado = null;
    this.error = null;
    this.cargando = true;

    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(this.rut)) {
      this.advertencia = 'Solo se permiten números, guion y K.';
      this.cargando = false;
      return;
    }

    this.validarRutService.validarRut(this.rut).subscribe({
      next: (response) => {
        this.resultado = response;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error del servidor';
        this.cargando = false;
        console.error('Error al validar RUT:', err);
      }
    });
  }
}
