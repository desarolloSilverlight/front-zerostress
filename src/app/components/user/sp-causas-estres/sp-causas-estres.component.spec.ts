import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCausasEstresComponent } from './sp-causas-estres.component';

describe('SpCausasEstresComponent', () => {
  let component: SpCausasEstresComponent;
  let fixture: ComponentFixture<SpCausasEstresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpCausasEstresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCausasEstresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
