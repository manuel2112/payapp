import { TestBed } from '@angular/core/testing';

import { StorageOrderService } from './storage-order.service';

describe('StorageOrderService', () => {
  let service: StorageOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
