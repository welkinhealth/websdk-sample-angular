import { TestBed } from '@angular/core/testing';

import { ZoomApiService } from './zoom-api.service';

describe('ZoomApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZoomApiService = TestBed.get(ZoomApiService);
    expect(service).toBeTruthy();
  });
});
