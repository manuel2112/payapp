import { TestBed } from '@angular/core/testing';

import { AperturaService } from './apertura.service';

describe('AperturaService', () => {
  let service: AperturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AperturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
