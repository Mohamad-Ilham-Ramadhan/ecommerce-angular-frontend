import { TestBed } from '@angular/core/testing';

import { ReviewNotifService } from './review-notif.service';

describe('ReviewNotifService', () => {
  let service: ReviewNotifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewNotifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
