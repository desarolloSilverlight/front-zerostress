import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditTpParametrosComponent} from './edit-tpParametros.component';

describe('EditModulosComponent', () => {
  let component: EditTpParametrosComponent;
  let fixture: ComponentFixture<EditTpParametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTpParametrosComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTpParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
