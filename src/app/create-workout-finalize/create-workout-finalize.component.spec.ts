import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkoutFinalizeComponent } from './create-workout-finalize.component';

describe('CreateWorkoutFinalizeComponent', () => {
  let component: CreateWorkoutFinalizeComponent;
  let fixture: ComponentFixture<CreateWorkoutFinalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkoutFinalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
