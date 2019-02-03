import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.submitted = false;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]//[Validators.required, Validators.minLength(6)]],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  showSuccess() {
    this.toastr.success('', 'Успешно вписване!');
  }

  showError() {
    this.toastr.error('', 'Грешно въведени данни!');
  }

  loginUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if (username && password) {
      this.auth.getJwtToken(username, password).subscribe(authResult => {
        this.setSession(authResult);
        this.auth.authenticate();
        this.showSuccess();
        this.router.navigateByUrl("/workouts")
      }, error => this.showError());
    }

  }
  private setSession(authResult) {
    localStorage.setItem('id_token', authResult);
  } 
}
