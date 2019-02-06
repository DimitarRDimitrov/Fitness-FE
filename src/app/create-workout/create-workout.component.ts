import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { WorkoutTypeService } from '../workout-service/workout-type.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RoomService } from '../workout-service/room.service';
import { CreateWorkoutParentService } from '../create-workout-parent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {

  authenticated: boolean;
  isAdmin: boolean;
  workoutTypes: string[];
  rooms: string[];
  createWorkoutForm: FormGroup;
  submitted: boolean;

  constructor(public authService: AuthService, private workoutTypeService: WorkoutTypeService, 
              private formBuilder: FormBuilder, private roomService: RoomService,
              private createWorkoutParent: CreateWorkoutParentService, private router: Router) {
  }

  ngOnInit() {
    this.submitted = false;

    this.authService.userIsAdmin;
    this.workoutTypeService.getWorkoutTypes()
    .then(data => this.workoutTypes = data);
    this.roomService.getRooms()
    .then(data => this.rooms = data);
    this.createWorkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      room: ['', Validators.required],
      capacity: ['', Validators.required],
      date: ['', Validators.required],
      // toDate: [''],
      trainer: ['', Validators.required]
    });
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.createWorkoutForm.get("trainer").disable();

    this.createWorkoutForm.controls.name.setValue(this.createWorkoutParent.name.value);
    this.createWorkoutForm.controls.type.setValue(this.createWorkoutParent.type.value);
    this.createWorkoutForm.controls.room.setValue(this.createWorkoutParent.room.value);
    this.createWorkoutForm.controls.capacity.setValue(this.createWorkoutParent.capacity.value);
    this.createWorkoutForm.controls.date.setValue(this.createWorkoutParent.date.value);
  }

  // handleValidation(recurring: boolean): void {
  //   if (recurring) {
  //     //console.log("checked");
  //     this.createWorkoutForm.controls.toDate.setValidators(Validators.required);
  //   } else {
  //     //console.log("unchecked");
  //     this.createWorkoutForm.controls.toDate.setValidators(Validators.nullValidator);
  //   }
  
  //   this.createWorkoutForm.controls.toDate.updateValueAndValidity();
  // }

  // convenience getter for easy access to form fields
  get f() { return this.createWorkoutForm.controls; }

  createWorkout(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.createWorkoutForm.invalid) {
      return;
    }

    const name = this.createWorkoutForm.get('name').value;
    const type = this.createWorkoutForm.get('type').value;
    const room = this.createWorkoutForm.get('room').value;
    const capacity = this.createWorkoutForm.get('capacity').value;
    const date = this.createWorkoutForm.get('date').value;
    const trainer = this.authService.user.userName;
    // const toDate = this.createWorkoutForm.get('toDate').value;
    
    this.createWorkoutParent.name.next(name);
    this.createWorkoutParent.type.next(type);
    this.createWorkoutParent.room.next(room);
    this.createWorkoutParent.capacity.next(capacity);
    this.createWorkoutParent.date.next(date);
    this.createWorkoutParent.trainer.next(trainer);
    // this.createWorkoutParent.toDate.next(toDate);

    this.router.navigateByUrl('/workouts/create-finalize');
  }
}
