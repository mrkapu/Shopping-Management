import { TestBed } from '@angular/core/testing';

import { NavigateServiceService } from './navigate-service.service';

describe('NavigateServiceService', () => {
  let service: NavigateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
