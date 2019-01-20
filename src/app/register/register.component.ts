import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      password: ['', Validators.required],//[Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  showSuccess() {
    this.toastr.success('Please Log In!', 'Registration Successful!');
  }

  showError() {
    this.toastr.error('Please check your details and try again!', 'Registration Failed!');
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
          this.showSuccess();
          this.router.navigateByUrl('/login');
        },
        error => this.showError());
  }
}
