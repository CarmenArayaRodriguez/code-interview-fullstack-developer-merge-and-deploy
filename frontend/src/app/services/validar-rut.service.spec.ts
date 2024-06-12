import { TestBed } from '@angular/core/testing';

import { ValidarRutService } from './validar-rut.service';

describe('ValidarRutService', () => {
  let service: ValidarRutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarRutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
