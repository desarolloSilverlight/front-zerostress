import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosGeneradosComponent } from './formularios-generados.component';

describe('FormulariosGeneradosComponent', () => {
  let component: FormulariosGeneradosComponent;
  let fixture: ComponentFixture<FormulariosGeneradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulariosGeneradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosGeneradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
