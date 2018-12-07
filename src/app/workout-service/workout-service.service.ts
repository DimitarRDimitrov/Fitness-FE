import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class WorkoutServiceService {
    apiRoot:string = "http://localhost:8080";

    constructor(
        private http: HttpClient,
        private router: Router ) {
    }

    getWorkoutById(workoutId: number) {
        let apiUrl = `${this.apiRoot}/workouts/${workoutId}`
        return this.http.get<Workout>(apiUrl)
        .toPromise();
    }

    getWorkouts(): Promise<Workout[]> {
        let apiUrl = `${this.apiRoot}/workouts/all`
        return this.http.get<Workout[]>(apiUrl)
        .toPromise();
    }

    savePlace(workoutId: number): Observable<boolean>{
        let apiUrl = `${this.apiRoot}/workouts/apply?workoutId=${workoutId}`;
        return this.http.post<boolean>(apiUrl, null);
    }

    freePlace(workoutId: number) {
        let apiUrl = `${this.apiRoot}/workouts/remove?workoutId=${workoutId}`;
        return this.http.post<boolean>(apiUrl, null).toPromise();
    }

    createWorkout(name, duration, capacity, date, time, trainer) {
        let apiUrl = `${this.apiRoot}/workouts/create`;
        return this.http.post<boolean>(apiUrl, {name, duration, capacity, date, time, trainer})
            .subscribe(
            data => { this.router.navigateByUrl('/') },
            error => {console.log("FAILED") });
    }
}
