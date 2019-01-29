import { Component, OnInit, NgModule } from '@angular/core';
import { WorkoutServiceService } from '../workout-service/workout-service.service';
import { AuthService } from '../auth.service';
import { WorkoutTypeService } from '../workout-service/workout-type.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {

  authenticated: boolean;
  isAdmin: boolean;
  workoutTypes: string[];
  createWorkoutForm: FormGroup;
  submitted: boolean;

  constructor(private workoutService: WorkoutServiceService, private authService: AuthService,
              private workoutTypeService: WorkoutTypeService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.submitted = false;

    this.authService.userIsAdmin;
    this.workoutTypeService.getWorkoutTypes()
    .then(data => this.workoutTypes = data);
    this.createWorkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      duration: ['', Validators.required],
      capacity: ['', Validators.required],
      date: ['', Validators.required],
      toDate: [''],
      time: ['', Validators.required],
      trainer: ['', Validators.required]
    });
  }

  handleValidation(recurring: boolean): void {
    if (recurring) {
      //console.log("checked");
      this.createWorkoutForm.controls.toDate.setValidators(Validators.required);
    } else {
      //console.log("unchecked");
      this.createWorkoutForm.controls.toDate.setValidators(Validators.nullValidator);
    }
  
    this.createWorkoutForm.controls.toDate.updateValueAndValidity();
  }

  // convenience getter for easy access to form fields
  get f() { return this.createWorkoutForm.controls; }

  createWorkout(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.createWorkoutForm.invalid) {
      return;
    }
    //console.log(this.createWorkoutForm);

    const name = this.createWorkoutForm.get('name').value;
    const type = this.createWorkoutForm.get('type').value;
    const duration = this.createWorkoutForm.get('duration').value;
    const capacity = this.createWorkoutForm.get('capacity').value;
    const date = this.createWorkoutForm.get('date').value;
    const time = this.createWorkoutForm.get('time').value;
    const trainer = this.createWorkoutForm.get('trainer').value;
    const dateTo = this.createWorkoutForm.get('toDate').value;
    
    this.workoutService.createWorkout(name, type, duration, capacity, date, time, trainer, dateTo);
  }
}
