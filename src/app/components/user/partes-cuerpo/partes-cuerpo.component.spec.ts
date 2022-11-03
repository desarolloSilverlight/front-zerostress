import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesCuerpoComponent } from './partes-cuerpo.component';

describe('PartesCuerpoComponent', () => {
  let component: PartesCuerpoComponent;
  let fixture: ComponentFixture<PartesCuerpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartesCuerpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesCuerpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
