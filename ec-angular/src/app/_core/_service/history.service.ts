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
export class HistoryService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeHistory`).pipe(
      map(response => {
        console.log('get tasks todolist: ', response);
        return response;
      })
    );
  }

  sortDateRange(start, end) {
    return this.http.get(`${this.baseUrl}Tasks/GetListTreeHistory/${start}/${end}`).pipe(
      map(response => {
        console.log('sortDateRange: ', response);
        return response;
      })
    );
  }
  undo(taskid) {
    return this.http.get(`${this.baseUrl}Tasks/Undo/${taskid}`);
  }
}
