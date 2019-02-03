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
  dateSelected: string;
  workoutsApplied: Map<number, boolean>;   
  weekDay: String[] = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  dayOfWeek: string[];
    

  constructor(private workoutService: WorkoutServiceService, private authService: AuthService, private toastr: ToastrService) {
    this.workouts = [];
    this.workoutTypeNames = [];
    this.workoutTrainers = [];
    this.typeSelected = "default";
    this.trainerSelected = "default";
    this.dateSelected = "default"
    this.dayOfWeek = [];
  }

  ngOnInit() {
    this.workoutService
      .getWorkouts(true)
      .then(res => {
        res.map(
          item => {
            this.workouts.push(item);
            if (!(this.workoutTypeNames.indexOf(item.workoutType.name) > -1)) {this.workoutTypeNames.push(item.workoutType.name);}
          });
        const map = new Map();
        for (const item of this.workouts) {
          if (!this.dayOfWeek.includes(item.date)) {
            this.dayOfWeek.push(item.date);
          } else {
            this.dayOfWeek.push("");
          }

          if (!map.has(item.trainer.userName)) {
            map.set(item.trainer.userName, true);
            this.workoutTrainers.push(item.trainer);
          }
        };})
      .catch(res => null);
    this.authService.authenticated.subscribe(data => this.authenticated = data);
  }

  dayOfWeekAsString(date: string) {
    if (date) {
      let newDate = new Date(date);
      let dayIndex = newDate.getDay();
      return ["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"][dayIndex];
    }
  }

  savePlace(workoutId: number) {
    this.workoutService.savePlace(workoutId)
      .subscribe(data => {
        if (data == true) {
          const currentWorkout = this.workouts.find(e => e.id === workoutId);
          currentWorkout.spaceRemaining = currentWorkout.spaceRemaining - 1;
          this.workouts.find(w => w.id === workoutId).applicants.push(this.authService.user);
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
          this.workouts.find(w => w.id === workoutId).applicants = [];
        }
      })
  }

  isUserAppliedForWorkout(workout: Workout): boolean {
    // console.log(workout.applicants[0]);
    // console.log(this.authService.user);
    for (let usr of workout.applicants) {
      if (usr.userName === this.authService.user.userName) {
        return true;
      }
    }
    // return workout.applicants.includes(this.authService.user);
    return false;
  }
}