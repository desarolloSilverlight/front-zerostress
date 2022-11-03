import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListNeurofacilitadorComponent} from './list-neurofacilitador.component';

describe('ListModulosComponent', () => {
  let component: ListNeurofacilitadorComponent;
  let fixture: ComponentFixture<ListNeurofacilitadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListNeurofacilitadorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNeurofacilitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
