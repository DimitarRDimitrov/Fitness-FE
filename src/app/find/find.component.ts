import { Component, OnInit } from '@angular/core';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { Workout } from '../workout-service/workout';
import { User } from '../user';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  workouts: Workout[];
  participants: User[];
  workoutParticipantsId: number;
  clicked: boolean;

  constructor(private workoutService: WorkoutServiceService) {
    this.workouts = [];
    this.participants = [];
    this.clicked = false;
  }

  ngOnInit() {
    this.workoutService
      .getWorkouts(true)
      .then(res => res.map(item => this.workouts.push(item)))
      .catch(res => null);
  }

  findParticipants(workoutId: number) {
    this.clicked = true;
    this.participants = [];
    this.workoutParticipantsId = workoutId;
    this.workoutService.getWorkoutParticipants(workoutId)
      .then(res => {
        res.forEach(item => {
          this.participants.push(item); 
        });
      })
      .catch(any => this.participants = null);
  }
}
