import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.userIsAdmin()) {
      return true;
    } else {
      console.log(this.authService.userIsAdmin());
      this.router.navigate(['/']);
      return false;
    }
  }
}
