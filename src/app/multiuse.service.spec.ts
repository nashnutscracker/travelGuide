import { TestBed, inject } from '@angular/core/testing';

import { MultiuseService } from './multiuse.service';

describe('MultiuseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiuseService]
    });
  });

  it('should be created', inject([MultiuseService], (service: MultiuseService) => {
    expect(service).toBeTruthy();
  }));
});
