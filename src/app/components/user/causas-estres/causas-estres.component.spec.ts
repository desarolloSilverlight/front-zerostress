import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CausasEstresComponent } from './causas-estres.component';

describe('CausasEstresComponent', () => {
  let component: CausasEstresComponent;
  let fixture: ComponentFixture<CausasEstresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CausasEstresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CausasEstresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
