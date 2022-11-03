import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioVivirComponent } from './diario-vivir.component';

describe('DiarioVivirComponent', () => {
  let component: DiarioVivirComponent;
  let fixture: ComponentFixture<DiarioVivirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioVivirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioVivirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
