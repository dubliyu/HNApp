import { TestBed } from '@angular/core/testing';

import { HnApiService } from './hn-api.service';

describe('HnApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HnApiService = TestBed.get(HnApiService);
    expect(service).toBeTruthy();
  });
});
