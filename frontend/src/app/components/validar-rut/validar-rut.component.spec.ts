import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarRutComponent } from './validar-rut.component';

describe('ValidarRutComponent', () => {
  let component: ValidarRutComponent;
  let fixture: ComponentFixture<ValidarRutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarRutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidarRutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
