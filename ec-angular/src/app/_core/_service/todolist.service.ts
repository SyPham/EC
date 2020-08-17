import { Injectable } from '@angular/core';
import { PaginatedResult } from '../_model/pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })
};
@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeTask/%20/%20/%20/%20/%20/%20/%20`).pipe(
      map(response => {
        console.log('get tasks todolist: ', response);
        return response;
      })
    );
  }
  sortProject() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeTask/project`);
  }
  sortRoutine() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeTask/routine`);
  }
  sortAbnormal() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeTask/abnormal`);
  }
  sortHigh() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeTask/H/%20`);
  }
  sortMedium() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeTask/M/%20`);
  }
  sortLow() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeTask/L/%20`);
  }
  sortByAssignedJob() {
    return this.http.get(`${this.baseUrl}Tasks/SortBy/assigned/Assigned`);
  }
  sortByBeAssignedJob() {
    return this.http.get(`${this.baseUrl}Tasks/SortBy/beAssigned/BeAssigned`);
  }
}
