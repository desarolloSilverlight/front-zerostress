import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFinalizacionComponent } from './modal-finalizacion.component';

describe('ModalFinalizacionComponent', () => {
  let component: ModalFinalizacionComponent;
  let fixture: ComponentFixture<ModalFinalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFinalizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFinalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
