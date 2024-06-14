import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ValidarRutService } from './validar-rut.service';
import { environment } from '../../environments/environment';


describe('ValidarRutService', () => {
  let service: ValidarRutService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidarRutService]
    });
    service = TestBed.inject(ValidarRutService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('debe validar un RUT válido', () => {
    const rut = '11222333-9';
    service.validarRut(rut).subscribe(response => {
      expect(response.valido).toBeTrue();
    });
    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush({ valido: true });
  });


  it('debe manejar un RUT inválido', () => {
    const rut = '12345678-2';
    service.validarRut(rut).subscribe(response => {
      expect(response.valido).toBeFalse();
    });
    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush({ valido: false });
  });


  xit('debe manejar errores del servidor', () => {
    const rut = '12345678-2';
    service.validarRut(rut).subscribe(
      () => fail('should have failed with 500 status'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );
    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush('Error del servidor', { status: 500, statusText: 'Internal Server Error' });
  });
});
