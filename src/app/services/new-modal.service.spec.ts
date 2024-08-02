import { TestBed } from '@angular/core/testing';

import { NewModalService} from './new-modal.service';

describe('NewModalService', () => {
  let service: NewModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
