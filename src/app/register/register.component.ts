import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
   }

  ngOnInit() {
    this.submitted = false;

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [
        Validators.required,
        this.matchOtherValidator('password')
      ]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  matchOtherValidator (otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;
  
    return function matchOtherValidate (control: FormControl) {
  
      if (!control.parent) {
        return null;
      }
  
      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
  
      if (!otherControl) {
        return null;
      }
  
      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }
  
      return null;
  
    }
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  showSuccess() {
    this.toastr.success('Можете да се впишете!', 'Регистрацията е успешна!');
  }

  showError() {
    this.toastr.error('Моля проверете детайлите си и опитайте отново!', 'Регистрацията е неуспешна!');
  }

  registerUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const firstName = this.registerForm.get('firstName').value;
    const lastName = this.registerForm.get('lastName').value;
    const email = this.registerForm.get('email').value;
    const phone = this.registerForm.get('phone').value;

    this.auth.saveUserDetails(username, password, email, firstName, lastName, phone)
      .subscribe(
        data => {
          if (data){
            this.showSuccess();
            this.router.navigateByUrl('/login');
          } else this.showError();
        },
        error => this.showError());
  }
}
