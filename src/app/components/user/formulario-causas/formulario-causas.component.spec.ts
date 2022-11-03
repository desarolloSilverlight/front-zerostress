import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCausasComponent } from './formulario-causas.component';

describe('FormularioCausasComponent', () => {
  let component: FormularioCausasComponent;
  let fixture: ComponentFixture<FormularioCausasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCausasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCausasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
