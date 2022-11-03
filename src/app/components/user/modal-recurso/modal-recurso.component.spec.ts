import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecursoComponent } from './modal-recurso.component';

describe('ModalRecursoComponent', () => {
  let component: ModalRecursoComponent;
  let fixture: ComponentFixture<ModalRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRecursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
