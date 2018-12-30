import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'app';
    
  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {
    // this.auth.authenticate(undefined, undefined);
  }

  
}
