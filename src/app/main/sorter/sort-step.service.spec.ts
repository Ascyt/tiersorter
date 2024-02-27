import { TestBed } from '@angular/core/testing';

import { SortStepService } from './sort-step.service';

describe('SortStepService', () => {
  let service: SortStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
