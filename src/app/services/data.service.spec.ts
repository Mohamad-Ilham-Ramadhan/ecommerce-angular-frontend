import { flush, flushMicrotasks, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { DataService } from './data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of, pipe, delay } from 'rxjs';

import { USERS } from './mock.data';

describe('DataService', () => {
  let service: DataService; 
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getAllUser().subscribe((users: any) => {
      expect(users).toBeTruthy();
      expect(users.length).toBe(3);
      const secondUser = users.find((user: any) => user.id === 2)
      expect(secondUser.name).toBe('Ron Weasley');
    });
    const mockReq = testingController.expectOne('api/users');
    expect(mockReq.request.method).toEqual('GET'); 
    mockReq.flush(Object.values(USERS));
  });

  it('should get by user id === 1', () => {
    console.log('get by id')
    service.getUserbyId(1).subscribe((user: any) => {
      console.log('user', user)
      expect(user).toBeTruthy();
      expect(user.name).toBe('Harry Potter');
    });
    const mockReq = testingController.expectOne('api/users/1');
    expect(mockReq.request.method).toEqual('GET'); 
    mockReq.flush(USERS[1]);
  });

  it('should update by user id', () => {
    console.log('update')
    const changes = {age: 24}
    service.updateUser(1, changes).subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.name).toBe('Harry Potter');
      expect(user.age).toBe(24); 
    });
    const mockReq = testingController.expectOne('api/users/1');
    console.log('request.body', mockReq.request.body)
    expect(mockReq.request.method).toEqual('PUT'); 

    console.log('askdfjlkj')

    const modifiedUser = {...USERS[1]};
    modifiedUser.age = 24
    mockReq.flush(modifiedUser);
  });

  it('should test a promise', fakeAsync(() => {
    let counter = 0;

    setTimeout(() => {
      counter = counter + 1; // 1
    }, 1000);

    setTimeout(() => {
      counter = counter + 2; // 3
    }, 2000)

    Promise.resolve(true).then((res) => {
      counter = counter + 3; // 6
    });
    flushMicrotasks();
    // flush();
    tick(3000)
    expect(counter).toBe(6);
    // flushMicrotasks();
    // flushMicrotasks();
    // expect(counter).toBe(4);
  }));

  it('should wait for async', waitForAsync(() => {
    let open = false;

    setTimeout(() => {
      open = true;
    }, 1000);
    // flush();
    expect(open).toBeTrue();
  }));

  it('should test an observable', fakeAsync(() => {
    let isShow = false;
    let myObs = of(isShow).pipe(delay(1000));
    // let myObs = of(isShow);
    myObs.subscribe(() => {
      isShow = true;
    });
    tick(1000)
    // flush();
    // flushMicrotasks();
    expect(isShow).toBeTrue();
  }));

});
