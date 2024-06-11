import { Test, TestingModule } from '@nestjs/testing';
import { ValidacionRutController } from './validacion-rut.controller';

describe('ValidacionRutController', () => {
  let controller: ValidacionRutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidacionRutController],
    }).compile();

    controller = module.get<ValidacionRutController>(ValidacionRutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
