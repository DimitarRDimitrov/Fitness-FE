import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
})
export class HeaderComponent {

  authenticated: boolean;
  admin: boolean;
  notification: boolean;
  userFirstName: String;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
     this.authService.isLoggedIn();
     this.authService.authenticated.subscribe(data => {
       this.authenticated = data; 
       this.authService.getUser()
       .then(res => this.userFirstName = res.firstName)
      });
     this.authService.isAdmin.subscribe(data => this.admin = data);
     this.authService.hasNotification.subscribe(data => this.notification = data);
  }

  logoutUser(): void {
    this.authService.logout();
  }  
}
