import { TestBed } from '@angular/core/testing';

import { IdrCurrencyService } from './idr-currency.service';

describe('IdrCurrencyService', () => {
  let service: IdrCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdrCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
