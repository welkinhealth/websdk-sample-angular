import { TestBed } from '@angular/core/testing';

import { WelkinApiService } from './welkin-api.service';

describe('WelkinApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WelkinApiService = TestBed.get(WelkinApiService);
    expect(service).toBeTruthy();
  });
});
