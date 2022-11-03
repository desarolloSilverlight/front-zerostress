import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditNeurofacilitadorComponent} from './edit-neurofacilitador.component';

describe('EditModulosComponent', () => {
  let component: EditNeurofacilitadorComponent;
  let fixture: ComponentFixture<EditNeurofacilitadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNeurofacilitadorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNeurofacilitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
