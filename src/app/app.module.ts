import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorkoutComponentComponent } from './workout-component/workout-component.component';
import {HttpClientModule} from "@angular/common/http";
import { WorkoutServiceService } from './workout-service/workout-service.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponentComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WorkoutServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
