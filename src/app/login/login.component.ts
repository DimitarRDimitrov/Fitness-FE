import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { 
  }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    if (username && password) {
      this.auth.getJwtToken(username, password).subscribe(authResult => {
        this.setSession(authResult);
        this.auth.authenticate();
        this.router.navigateByUrl("/profile")
      });
    }

  }
  private setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult);
    console.log(authResult);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  } 
  

}
