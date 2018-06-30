import { Component, OnInit } from '@angular/core';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { Workout } from '../workout-service/workout';

@Component({
  selector: 'app-workout-component',
  templateUrl: './workout-component.component.html',
  styleUrls: ['./workout-component.component.css']
})
export class WorkoutComponentComponent implements OnInit {

  workouts:Workout[];

  constructor(private workoutService: WorkoutServiceService) {
    this.workouts = [];
   }

  ngOnInit() {
    this.workoutService
    .getWorkouts()
    .then(res => res.map(item => this.workouts.push(item)));
  }

}
