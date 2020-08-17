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
export class FollowService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get(`${this.baseUrl}Follow/LoadFollow`).pipe(
      map(response => {
        console.log('get tasks follow: ', response);
        return response;
      })
    );
  }
  unfollow(taskid) {
    return this.http.delete(`${this.baseUrl}Follow/Unfollow/${taskid}`);
  }

  sortProject() {
    return this.http.get(`${this.baseUrl}Follow/LoadFollow/project`);
  }
  sortRoutine() {
    return this.http.get(`${this.baseUrl}Follow/LoadFollow/routine`);
  }
  sortAbnormal() {
    return this.http.get(`${this.baseUrl}Follow/LoadFollow/abnormal`);
  }
  sortHigh() {
    return this.http.get(`${this.baseUrl}Follow/LoadFollow/H/%20`);
  }
  sortMedium() {
    return this.http.get(`${this.baseUrl}Follow/LoadFollow/M/%20`);
  }
  sortLow() {
    return this.http.get(`${this.baseUrl}Follow/LoadFollow/L/%20`);
  }
}
