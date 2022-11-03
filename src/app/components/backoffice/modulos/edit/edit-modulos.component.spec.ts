import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditModulosComponent} from './edit-modulos.component';

describe('EditModulosComponent', () => {
  let component: EditModulosComponent;
  let fixture: ComponentFixture<EditModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditModulosComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
