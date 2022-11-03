import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpasswordComponent } from './rpassword.component';

describe('RpasswordComponent', () => {
  let component: RpasswordComponent;
  let fixture: ComponentFixture<RpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
