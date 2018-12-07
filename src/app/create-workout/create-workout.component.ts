import { Component, OnInit } from '@angular/core';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {

  authenticated: boolean;
  isAdmin: boolean;

  constructor(private workoutService: WorkoutServiceService, private authService: AuthService) {
   }

  ngOnInit() {
    this.authService.userIsAdmin
  }

  createWorkout(event){
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#name').value;
    const duration = target.querySelector('#duration').value;
    const capacity = target.querySelector('#capacity').value;
    const date = target.querySelector('#date').value;
    const time = target.querySelector('#time').value;
    const trainer = target.querySelector('#trainer').value;

    this.workoutService
    .createWorkout(name, duration, capacity, date, time, trainer);
  }
}
