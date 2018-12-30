import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WorkoutTypeService {

  apiRoot:string = "http://localhost:8080";

    constructor(
        private http: HttpClient,
        private router: Router ) {
    }

    getWorkoutTypes(): Promise<string[]> {
      let apiUrl = `${this.apiRoot}/workout-type/all`
      return this.http.get<string[]>(apiUrl)
      .toPromise();
    }

    createWorkoutType(workoutTypeName: string): Promise<boolean> {
      let apiUrl = `${this.apiRoot}/workout-type/create`;
      return this.http.post<boolean>(this.apiRoot, {[name]: workoutTypeName}).toPromise();
    }

}
