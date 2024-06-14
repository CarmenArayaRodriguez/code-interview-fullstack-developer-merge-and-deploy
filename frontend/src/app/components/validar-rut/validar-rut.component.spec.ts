import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarRutComponent } from './validar-rut.component';
import { ValidarRutService } from '../../services/validar-rut.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('ValidarRutComponent', () => {
  let component: ValidarRutComponent;
  let fixture: ComponentFixture<ValidarRutComponent>;
  let validarRutService: ValidarRutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidarRutComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [ValidarRutService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarRutComponent);
    component = fixture.componentInstance;
    validarRutService = TestBed.inject(ValidarRutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar mensaje de advertencia para RUT inválido', () => {
    component.rut = '1234abcd';
    component.onSubmit();
    expect(component.advertencia).toBe('Solo se permiten números, guion y K.');
  });

  it('debe manejar respuesta válida del servicio', () => {
    spyOn(validarRutService, 'validarRut').and.returnValue(of({ valido: true, mensaje: 'El RUT es válido.' }));
    component.rut = '11222333-9';
    component.onSubmit();
    expect(component.resultado?.valido).toBeTrue();
    expect(component.resultado?.mensaje).toBe('El RUT es válido.');
  });

  it('debe manejar respuesta inválida del servicio', () => {
    spyOn(validarRutService, 'validarRut').and.returnValue(of({ valido: false, mensaje: 'El RUT es inválido.' }));
    component.rut = '12345678-2';
    component.onSubmit();
    expect(component.resultado?.valido).toBeFalse();
    expect(component.resultado?.mensaje).toBe('El RUT es inválido.');
  });

  xit('debe manejar errores del servicio', () => {
    spyOn(validarRutService, 'validarRut').and.returnValue(throwError(() => new Error('Error del servidor')));
    component.rut = '12345678-2';
    component.onSubmit();
    expect(component.error).toBe('Error del servidor');
  });
});
