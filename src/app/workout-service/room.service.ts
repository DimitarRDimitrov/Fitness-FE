import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiRoot:string = "http://localhost:8080";

    constructor(
        private http: HttpClient ) {
    }

    getRooms(): Promise<string[]> {
      let apiUrl = `${this.apiRoot}/room/all`
      return this.http.get<string[]>(apiUrl)
      .toPromise();
    }
}