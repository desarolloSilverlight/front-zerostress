import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvaluarComponent } from './modal-evaluar.component';

describe('ModalEvaluarComponent', () => {
  let component: ModalEvaluarComponent;
  let fixture: ComponentFixture<ModalEvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
