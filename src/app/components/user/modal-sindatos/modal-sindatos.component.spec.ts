import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSindatosComponent } from './modal-sindatos.component';

describe('ModalSindatosComponent', () => {
  let component: ModalSindatosComponent;
  let fixture: ComponentFixture<ModalSindatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSindatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSindatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
