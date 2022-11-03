import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFinishComponent } from './formulario-finish.component';

describe('FormularioFinishComponent', () => {
  let component: FormularioFinishComponent;
  let fixture: ComponentFixture<FormularioFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioFinishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
