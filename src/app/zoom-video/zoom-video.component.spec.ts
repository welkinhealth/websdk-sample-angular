import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZoomVideoComponent } from './zoom-video.component';

describe('ZoomVideoComponent', () => {
  let component: ZoomVideoComponent;
  let fixture: ComponentFixture<ZoomVideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
