import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RolesAsocOpcionesComponent} from './roles-asoc-opciones.component';

describe('RolesAsocOpcionesComponent', () => {
  let component: RolesAsocOpcionesComponent;
  let fixture: ComponentFixture<RolesAsocOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesAsocOpcionesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAsocOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
