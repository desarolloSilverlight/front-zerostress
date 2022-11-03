import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasConsultaComponent } from './temas-consulta.component';

describe('TemasConsultaComponent', () => {
  let component: TemasConsultaComponent;
  let fixture: ComponentFixture<TemasConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemasConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemasConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
