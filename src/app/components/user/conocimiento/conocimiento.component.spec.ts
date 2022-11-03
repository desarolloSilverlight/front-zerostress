import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocimientoComponent } from './conocimiento.component';

describe('ConocimientoComponent', () => {
  let component: ConocimientoComponent;
  let fixture: ComponentFixture<ConocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConocimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
