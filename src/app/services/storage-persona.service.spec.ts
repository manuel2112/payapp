import { TestBed } from '@angular/core/testing';

import { StoragePersonaService } from './storage-persona.service';

describe('StoragePersonaService', () => {
  let service: StoragePersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragePersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
