import { TestBed } from '@angular/core/testing';

import { CustomerTransServiceService } from './customer-trans-service.service';

describe('CustomerTransServiceService', () => {
  let service: CustomerTransServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTransServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
