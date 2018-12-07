import { Component, OnInit } from '@angular/core';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { Workout } from '../workout-service/workout';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  
  workouts: Workout[];
  authenticated: boolean;

  constructor(private workoutService: WorkoutServiceService, private authService: AuthService) {
    this.workouts = [];
    
   }

  ngOnInit() {
    this.workoutService
    .getWorkouts()
    .then(res => res.map(item => this.workouts.push(item)))
    .catch(res => null);
    this.authService.authenticated.subscribe(data => this.authenticated = data);
    console.log(this.authenticated);
  } 

  savePlace(workoutId: number) {
    this.workoutService.savePlace(workoutId)
      .subscribe(data => {
        if (data == true) {
          const currentWorkout = this.workouts.find(e => e.id === workoutId);
          currentWorkout.spaceRemaining = currentWorkout.spaceRemaining - 1;
        }
      })
  }

  freePlace(workoutId: number) {
    this.workoutService.freePlace(workoutId)
      .then(booleanResult => {
        if (booleanResult) {
          const currentWorkout = this.workouts.find(e => e.id === workoutId);
          currentWorkout.spaceRemaining = currentWorkout.spaceRemaining + 1;
        }
      })
  }

}
