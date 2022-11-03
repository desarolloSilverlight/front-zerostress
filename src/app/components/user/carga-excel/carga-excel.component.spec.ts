import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaExcelComponent } from './carga-excel.component';

describe('CargaExcelComponent', () => {
  let component: CargaExcelComponent;
  let fixture: ComponentFixture<CargaExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
