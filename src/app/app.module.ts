import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WorkoutComponent } from './workout/workout.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { WorkoutServiceService } from './workout-service/workout-service.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { AuthInterceptor } from './auth-interceptor';
import { AdminGuardService } from './admin-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ContactsComponent } from './contacts/contacts.component';
import {
  ToastrModule,
} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FindComponent } from './find/find.component';
 

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CreateWorkoutComponent,
    ProfileComponent,
    ContactsComponent,
    FindComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: '',
        children: [
          { path: 'contacts', component: ContactsComponent},
          { path: 'profile', component: ProfileComponent},
          { path: 'workouts', component: WorkoutComponent},
          { path: 'workouts/create',
            component: CreateWorkoutComponent,
            canActivate: [AdminGuardService]},
          { path: 'find',
          component: FindComponent,
          canActivate: [AdminGuardService]}
        ],
        component: HomeComponent
      }
    ]),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  providers: [WorkoutServiceService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
