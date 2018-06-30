import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';

@Injectable()
export class WorkoutServiceService {
    apiRoot:string = "http://localhost:8080";

    constructor(private http: HttpClient) {
    }

    getWorkouts(): Promise<Workout[]> {
            let apiUrl = `${this.apiRoot}/workouts/generated`
            return this.http.get<Workout[]>(apiUrl)
            .toPromise();
    }
}
