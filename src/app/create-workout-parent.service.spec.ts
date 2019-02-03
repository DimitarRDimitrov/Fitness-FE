import { TestBed, inject } from '@angular/core/testing';

import { CreateWorkoutParentService } from './create-workout-parent.service';

describe('CreateWorkoutParentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateWorkoutParentService]
    });
  });

  it('should be created', inject([CreateWorkoutParentService], (service: CreateWorkoutParentService) => {
    expect(service).toBeTruthy();
  }));
});
