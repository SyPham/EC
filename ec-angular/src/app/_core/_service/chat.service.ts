import { Injectable } from '@angular/core';
import { PaginatedResult } from '../_model/pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task } from '../_model/Task';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getProjects(keyword = '') {
    return this.http.get(`${this.baseUrl}Projects/GetAllPaging/1/1000/${keyword}`).pipe(
      map(response => {
        console.log('get getProjects chat: ', response['data']);
        return response['data'];
      })
    );
  }
  getChatMessage(room) {
    return this.http.get(`${this.baseUrl}Chat/GetAllMessageByRoomAndProject/${room}`).pipe(
      map(response => {
        console.log('get getChatMessage: ', response);
        return response;
      })
    );
  }
}
