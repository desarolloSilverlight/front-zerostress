import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconocimientoComponent } from './reconocimiento.component';

describe('ReconocimientoComponent', () => {
  let component: ReconocimientoComponent;
  let fixture: ComponentFixture<ReconocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconocimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
