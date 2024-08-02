import { TestBed } from '@angular/core/testing';

import { CustomTeleportService } from './custom-teleport.service';

describe('CustomTeleportService', () => {
  let service: CustomTeleportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTeleportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
