import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNotifListComponent } from './review-notif-list.component';

describe('ReviewNotifListComponent', () => {
  let component: ReviewNotifListComponent;
  let fixture: ComponentFixture<ReviewNotifListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewNotifListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewNotifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
