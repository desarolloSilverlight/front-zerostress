import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpCerebroComponent } from './tp-cerebro.component';

describe('TpCerebroComponent', () => {
  let component: TpCerebroComponent;
  let fixture: ComponentFixture<TpCerebroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpCerebroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpCerebroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
