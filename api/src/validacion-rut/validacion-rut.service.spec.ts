import { Test, TestingModule } from '@nestjs/testing';
import { ValidacionRutService } from './validacion-rut.service';

describe('ValidacionRutService', () => {
  let service: ValidacionRutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidacionRutService],
    }).compile();

    service = module.get<ValidacionRutService>(ValidacionRutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe retornar true para un RUT válido', () => {
    expect(service.validarRut('13976372-6')).toBe(true);
  });

  it('debe retornar false para un RUT inválido', () => {
    expect(service.validarRut('12345678-2')).toBe(false);
  });

  // Pruebas de casos extremos
  it('debe retornar false para un RUT vacío', () => {
    expect(service.validarRut('')).toBe(false);
  });

  it('debe retornar false para un RUT demasiado largo', () => {
    expect(service.validarRut('12345678901234567890')).toBe(false);
  });

  it('debe retornar false para un RUT con caracteres no válidos', () => {
    expect(service.validarRut('1234abcd-5')).toBe(false);
  });
});
