import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVentasComponent } from './formulario-ventas.component';

describe('FormularioVentasComponent', () => {
  let component: FormularioVentasComponent;
  let fixture: ComponentFixture<FormularioVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
