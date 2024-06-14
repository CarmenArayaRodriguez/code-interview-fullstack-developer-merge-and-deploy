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
});
