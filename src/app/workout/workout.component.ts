import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { Workout } from '../workout-service/workout';
import { AuthService } from '../auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { User } from '../user';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workouts: Workout[];
  workoutTypeNames: String[];
  workoutTrainers: User[];
  authenticated: boolean;
  typeSelected: string;
  trainerSelected: string;

  constructor(private workoutService: WorkoutServiceService, private authService: AuthService, private toastr: ToastrService) {
    this.workouts = [];
    this.workoutTypeNames = [];
    this.workoutTrainers = [];
    this.typeSelected = "default";
    this.trainerSelected = "default";
  }

  ngOnInit() {
    this.workoutService
      .getWorkouts(true)
      .then(res => {
        res.map(
          item => {
            this.workouts.push(item);
            if (!(this.workoutTypeNames.indexOf(item.workoutType.name) > -1)) this.workoutTypeNames.push(item.workoutType.name);
          });
        const map = new Map();
        for (const item of this.workouts) {
          if (!map.has(item.trainer.userName)) {
            map.set(item.trainer.userName, true);
            this.workoutTrainers.push(item.trainer);
          }
        }
      console.log(res)})
      .catch(res => null);
    this.authService.authenticated.subscribe(data => this.authenticated = data);
  }


  savePlace(workoutId: number) {
    this.workoutService.savePlace(workoutId)
      .subscribe(data => {
        if (data == true) {
          const currentWorkout = this.workouts.find(e => e.id === workoutId);
          currentWorkout.spaceRemaining = currentWorkout.spaceRemaining - 1;
        } else {
          this.showErrorSavePlace();
        }
      })
  }

  showErrorSavePlace() {
    this.toastr.error('Please check availability.', 'Error saving place!');
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