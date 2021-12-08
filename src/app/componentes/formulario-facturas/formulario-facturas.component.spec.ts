import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFacturasComponent } from './formulario-facturas.component';

describe('FormularioFacturasComponent', () => {
  let component: FormularioFacturasComponent;
  let fixture: ComponentFixture<FormularioFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioFacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
