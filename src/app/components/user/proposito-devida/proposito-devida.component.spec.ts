import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositoDevidaComponent } from './proposito-devida.component';

describe('PropositoDevidaComponent', () => {
  let component: PropositoDevidaComponent;
  let fixture: ComponentFixture<PropositoDevidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropositoDevidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositoDevidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
