import { TestBed } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { SharedService } from './shared.service';

describe('CalcService', () => {
  let service: CalcService;
  let sharedService: SharedService;

  // beforeEach(() => {
  //   console.log('before each');
    
  //   const spy = jasmine.createSpyObj('SharedService', ['baby']);

  //   TestBed.configureTestingModule({
  //     providers: [CalcService, {provide: SharedService, useValue: spy}]
  //   })
    
  //   sharedService = TestBed.inject(SharedService);
  //   service = TestBed.inject(CalcService);
  // });

  it('should be multiple', () => {
    const sharedService = new SharedService();
    const service = new CalcService(sharedService);
    console.log('multiple [start]')
    expect(service.multiple(2, 3)).toBe(6);
    console.log('multiple [end]') 
  });

  it('should be called dependecy method', () => {
    // const sharedService = new SharedService();

    const sharedService = jasmine.createSpyObj('SharedService', ['baby']);
    const service = new CalcService(sharedService);
    console.log('dependency [start]')
    // spyOn(sharedService, 'baby').and.callThrough();
    service.multiple(3,3)
    console.log('dependency [end]')
    expect(sharedService.baby).toHaveBeenCalled();
  });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(CalcService);
  //   console.log('service', service);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  // it('should multiply rightly', () => {
  //   expect(service.multiple(2, 3)).toBe(6);
  // });

  // it('should be called dependency method', () => {
  //   expect(service.baby)
  // });
});
