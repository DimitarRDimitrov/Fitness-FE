import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService) { }

  registerUser(event){

    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    const firstName = target.querySelector('#firstName').value;
    const lastName = target.querySelector('#lastName').value;
    const email = target.querySelector('#email').value;
    const phone = target.querySelector('#phone').value;

    this.auth.saveUserDetails(username, password, email, firstName, lastName, phone);
    console.log(username, password);

  }
}
