import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditRolesComponent} from './edit-roles.component';

describe('EditModulosComponent', () => {
  let component: EditRolesComponent;
  let fixture: ComponentFixture<EditRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRolesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});