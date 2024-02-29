import { TestBed } from '@angular/core/testing';

import { AllDestinationsService } from './all-destinations.service';

describe('AllDestinationsService', () => {
  let service: AllDestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllDestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
