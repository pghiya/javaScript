import { TestBed } from '@angular/core/testing';

import { FetchUserDetailsService } from './fetch-user-details.service';

describe('FetchUserDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchUserDetailsService = TestBed.get(FetchUserDetailsService);
    expect(service).toBeTruthy();
  });
});
