import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditModulosOpcionesComponent} from './edit-modulosOpciones.component';

describe('EditModulosComponent', () => {
  let component: EditModulosOpcionesComponent;
  let fixture: ComponentFixture<EditModulosOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditModulosOpcionesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModulosOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
