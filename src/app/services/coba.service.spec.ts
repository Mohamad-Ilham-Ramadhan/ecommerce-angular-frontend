import { TestBed } from '@angular/core/testing';

import { CobaService } from './coba.service';

describe('CobaService', () => {
  let service: CobaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
