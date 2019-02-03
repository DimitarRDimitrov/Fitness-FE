import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';

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

    getWorkouts(fromToday: boolean): Promise<Workout[]> {
        let apiUrl = `${this.apiRoot}/workouts/all?startDateNow=${fromToday}`;
        return this.http.get<Workout[]>(apiUrl)
        .toPromise();
    }

    getWorkoutsByUser(): Promise<Workout[]> {
        let apiUrl = `${this.apiRoot}/workouts/user`
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

    createWorkout(name, workoutType, roomName, duration, capacity, date, time, trainerUsername, dateTo): Promise<any> {
        let apiUrl = `${this.apiRoot}/workouts/create`;
        return this.http.post<boolean>(apiUrl, {name, workoutType, roomName, duration, capacity, date, time, trainerUsername, dateTo})
        .toPromise();
    }

    getWorkoutParticipants(workoutId: number) {
        let apiUrl = `${this.apiRoot}/workouts/find?workoutId=${workoutId}`;
        return this.http.get<Set<User>>(apiUrl).toPromise();
    }

    deleteWorkout(workoutId: number){
        let apiUrl = `${this.apiRoot}/workouts/delete?workoutId=${workoutId}`;
        return this.http.post<boolean>(apiUrl, null).toPromise();
    }

    getRoomWorkouts(roomName: String, date: String){
        let apiUrl = `${this.apiRoot}/workouts/find/${roomName}?date=${date}`;
        return this.http.get<Workout[]>(apiUrl).toPromise();
    }
}
