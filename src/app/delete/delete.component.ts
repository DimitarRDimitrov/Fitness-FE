import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout-service/workout';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  workouts: Workout[];
  
  constructor( private workoutService: WorkoutServiceService, private toastr: ToastrService, private auth: AuthService ) {
    this.workouts = []; 
  }

  ngOnInit() {
   this.populateWorkouts();
  }

  populateWorkouts(): void {
    this.workouts = [];
    this.workoutService
      .getWorkouts(true)
      .then(res => res.map(item => {
        console.log(this.auth.user.userName);
        console.log(item.trainer);
        if (this.auth.user.userName !== null && this.auth.user.userName === (<User> item.trainer).userName) {
          this.workouts.push(item);
        }
      }))
      .catch(res => null);
  }

  showSuccess() {
    this.toastr.success('', 'Успешно изтрита тренировка!');
  }

  showError() {
    this.toastr.error('Не можете да изтриете тази тренировка!', 'Изтриването се провали!');
  }

  deleteWorkout(workoutId: number) {
    this.workoutService.deleteWorkout(workoutId)
      .then(result => {
        if (result) {
          this.showSuccess();
        } else {
          this.showError();
        }
        this.populateWorkouts();
      })
      .catch(any => this.showError());
  }
}
