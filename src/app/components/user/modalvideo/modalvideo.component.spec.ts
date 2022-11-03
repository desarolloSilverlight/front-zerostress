import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalvideoComponent } from './modalvideo.component';

describe('ModalvideoComponent', () => {
  let component: ModalvideoComponent;
  let fixture: ComponentFixture<ModalvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalvideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
