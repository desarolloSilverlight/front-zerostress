import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListTpParametrosComponent} from './list-tpParametros.component';

describe('ListModulosComponent', () => {
  let component: ListTpParametrosComponent;
  let fixture: ComponentFixture<ListTpParametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTpParametrosComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTpParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
