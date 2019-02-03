import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateWorkoutParentService } from '../create-workout-parent.service';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { Workout } from '../workout-service/workout';

declare function layOutDay(params: any);

@Component({
  selector: 'app-create-workout-finalize',
  templateUrl: './create-workout-finalize.component.html',
  styleUrls: ['./create-workout-finalize.component.css']
})
export class CreateWorkoutFinalizeComponent implements OnInit, AfterContentInit {

  createWorkoutFinalizeForm: FormGroup;
  submitted: boolean;
  workoutsForDateAndRoom: Workout[];
  events: object[];

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private workoutService: WorkoutServiceService, public createWorkoutParent: CreateWorkoutParentService) {
    this.workoutsForDateAndRoom = [];
    this.events = [];
  }

  ngOnInit() {
    this.submitted = false;

    this.authService.userIsAdmin;

    this.createWorkoutFinalizeForm = this.formBuilder.group({
      duration: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngAfterContentInit(): void {
    this.workoutService.getRoomWorkouts(this.createWorkoutParent.room.value, this.createWorkoutParent.date.value)
    .then(res => {
      res.forEach(workout => { 
        // let woTime = workout.time.replace(':', '');
        let woTime = workout.time.split(":");
        const time: number = parseInt(woTime[0]) * 60 + parseInt(woTime[1]);
        const startTime: number = time - 540;
        const endTime: number = (time - 540 + workout.duration);
        this.events.push({start: startTime, end: endTime});
      })
      console.log(this.events);
      layOutDay(this.events);
    })
    .catch(any => console.log("asdsad"));

    
  }

  // convenience getter for easy access to form fields
  get f() { return this.createWorkoutFinalizeForm.controls; }

  createWorkout() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createWorkoutFinalizeForm.invalid) {
      return;
    }

    const duration = this.createWorkoutFinalizeForm.get('duration').value;
    const time = this.createWorkoutFinalizeForm.get('time').value;

    this.createWorkoutParent.duration.next(duration);
    this.createWorkoutParent.time.next(time);

    this.createWorkoutParent.createWorkout();
  }

}
