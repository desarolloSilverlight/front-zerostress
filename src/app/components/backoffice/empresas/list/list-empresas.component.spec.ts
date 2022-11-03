import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListEmpresasComponent} from './list-empresas.component';

describe('ListModulosComponent', () => {
  let component: ListEmpresasComponent;
  let fixture: ComponentFixture<ListEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEmpresasComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
