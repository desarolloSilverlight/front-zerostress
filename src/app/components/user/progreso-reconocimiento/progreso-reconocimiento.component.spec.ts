import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoReconocimientoComponent } from './progreso-reconocimiento.component';

describe('ProgresoReconocimientoComponent', () => {
  let component: ProgresoReconocimientoComponent;
  let fixture: ComponentFixture<ProgresoReconocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgresoReconocimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresoReconocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
