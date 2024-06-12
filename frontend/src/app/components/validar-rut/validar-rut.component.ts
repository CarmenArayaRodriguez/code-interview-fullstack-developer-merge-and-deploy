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

  constructor(private validarRutService: ValidarRutService) { }

  onSubmit() {
    this.validarRutService.validarRut(this.rut)
      .subscribe(response => {
        this.resultado = response;
      }, error => {
        console.error('Error al validar RUT:', error);
        this.resultado = { valido: false };
      });
  }
}
