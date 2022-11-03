import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListModulosOpcionesComponent} from './list-modulosOpciones.component';

describe('ListModulosComponent', () => {
  let component: ListModulosOpcionesComponent;
  let fixture: ComponentFixture<ListModulosOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListModulosOpcionesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModulosOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
