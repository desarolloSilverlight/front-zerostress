import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDatosComponent } from './cambio-datos.component';

describe('CambioDatosComponent', () => {
  let component: CambioDatosComponent;
  let fixture: ComponentFixture<CambioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
