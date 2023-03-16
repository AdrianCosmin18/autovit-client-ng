import { TestBed } from '@angular/core/testing';

import { CarNgRxService } from './car-ng-rx.service';

describe('CarNgRxService', () => {
  let service: CarNgRxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarNgRxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
