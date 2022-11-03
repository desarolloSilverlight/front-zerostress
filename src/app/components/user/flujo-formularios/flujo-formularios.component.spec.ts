import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoFormulariosComponent } from './flujo-formularios.component';

describe('FlujoFormulariosComponent', () => {
  let component: FlujoFormulariosComponent;
  let fixture: ComponentFixture<FlujoFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlujoFormulariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
