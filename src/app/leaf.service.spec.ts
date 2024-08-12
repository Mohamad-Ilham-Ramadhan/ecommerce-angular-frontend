import { TestBed } from '@angular/core/testing';

import { LeafService } from './leaf.service';

describe('LeafService', () => {
  let service: LeafService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
