import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Workout } from '../workout-service/workout';
import { WorkoutServiceService } from '../workout-service/workout-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = null;
  userWorkouts: Workout[];

  constructor(private workoutService: WorkoutServiceService, private authService: AuthService) {
    this.userWorkouts = [];
    
   }

  ngOnInit() {
    this.authService
    .getUser()
    .then(response => this.user = response)
    .catch(response => this.user = null);
    this.workoutService
    .getWorkoutsByUser()
    .then(res => res.map(item => this.userWorkouts.push(item)))
    .catch(res => null);
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.authService.hasNotification.getValue() === false) {
      return;
    }
    this.authService.seeNotification()
      .then(any => this.authService.notificationSeen());
  }

  getStyle(workout: Workout) {
    if (workout.deleted) {
      return "red";
    } else {
      return "";
    }
  }

}
