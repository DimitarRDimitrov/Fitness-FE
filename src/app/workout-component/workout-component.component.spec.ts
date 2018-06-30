import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutComponentComponent } from './workout-component.component';

describe('WorkoutComponentComponent', () => {
  let component: WorkoutComponentComponent;
  let fixture: ComponentFixture<WorkoutComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
