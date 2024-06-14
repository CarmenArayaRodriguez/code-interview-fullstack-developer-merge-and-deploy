import { Test, TestingModule } from '@nestjs/testing';
import { ValidacionRutController } from './validacion-rut.controller';
import { ValidacionRutService } from './validacion-rut.service';
import { ValidacionRutModule } from './validacion-rut.module';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

describe('ValidacionRutController', () => {
  let controller: ValidacionRutController;
  let service: ValidacionRutService;
  let mockRes: Partial<Response> & { status: jest.Mock; json: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ValidacionRutModule],
    }).compile();

    controller = module.get<ValidacionRutController>(ValidacionRutController);
    service = module.get<ValidacionRutService>(ValidacionRutService);
    mockRes = mockResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debe retornar true para un RUT válido', async () => {
    jest.spyOn(service, 'validarRut').mockReturnValue(true);
    await controller.validarRut('11222333-9', mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockRes.json).toHaveBeenCalledWith({
      mensaje: 'El RUT es válido.',
      valido: true,
    });
  });

  it('debe retornar false para un RUT inválido', async () => {
    jest.spyOn(service, 'validarRut').mockReturnValue(false);
    await controller.validarRut('12345678-2', mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith({
      mensaje: 'El RUT es inválido.',
      valido: false,
    });
  });

  it('should handle errors', async () => {
    jest.spyOn(service, 'validarRut').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    await controller.validarRut('12345678-2', mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      mensaje: 'Error interno del servidor',
      valido: false,
    });
  });
  it('should handle errors', async () => {
    jest.spyOn(service, 'validarRut').mockImplementation(() => {
      throw new Error('Internal server error');
    });
    await controller.validarRut('12345678-2', mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      mensaje: 'Error interno del servidor',
      valido: false,
    });
  });

  // Pruebas de casos extremos
  it('debe retornar error 400 para un RUT vacío', async () => {
    await controller.validarRut('', mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith({
      mensaje: 'RUT es requerido',
      valido: false,
    });
  });

  it('debe retornar error 400 para un RUT demasiado largo', async () => {
    jest.spyOn(service, 'validarRut').mockReturnValue(false);
    await controller.validarRut('12345678901234567890', mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith({
      mensaje: 'El RUT es inválido.',
      valido: false,
    });
  });

  it('debe retornar error 400 para un RUT con caracteres no válidos', async () => {
    jest.spyOn(service, 'validarRut').mockReturnValue(false);
    await controller.validarRut('1234abcd-5', mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith({
      mensaje: 'El RUT es inválido.',
      valido: false,
    });
  });
  function mockResponse() {
    return {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response> & { status: jest.Mock; json: jest.Mock };
  }
});
