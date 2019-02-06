import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkoutServiceService } from './workout-service/workout-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateWorkoutParentService {

  name = new BehaviorSubject<String>("");
  type = new BehaviorSubject<String>("");
  room = new BehaviorSubject<String>("");
  duration = new BehaviorSubject<String>("");
  capacity = new BehaviorSubject<String>("");
  date = new BehaviorSubject<String>("");
  // toDate = new BehaviorSubject<String>("");
  time = new BehaviorSubject<String>("");
  trainer = new BehaviorSubject<String>("");

  constructor(private workoutService: WorkoutServiceService, private toastr: ToastrService, private router: Router) { }

  showSuccess() {
    this.toastr.success('', 'Успешно създадена тренировка!');
  }

  showError() {
    this.toastr.error('', 'Тренировката не е създадена!');
  }

  createWorkout() {
    this.workoutService.createWorkout(this.name.value, this.type.value, this.room.value, this.duration.value,
      this.capacity.value, this.date.value, this.time.value, this.trainer.value, null)
      .then(res => {
        if (res) {
          this.showSuccess();
          this.name.next("");
          this.type.next("");
          this.room.next("");
          this.date.next("");
          this.capacity.next("");
          this.router.navigateByUrl("/workouts")
        } else {
          this.showError();
        }
      })
      .catch(any => this.showError());
  }
}
