import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../_model/project';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Manager, Member, Detail } from '../_model/projectDetail';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class ListTaskProjectService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  messageSource = new BehaviorSubject<any[]>([]);
  currentMessage = this.messageSource.asObservable();
  // method này để change source message
  changeMessage(message: any[]) {
    this.messageSource.next(message);
  }
  getListTree(id) {
    return this.http.get(`${this.baseUrl}Projects/GetListTreeProjectDetail/${id}`);
  }
  sortHigh(id) {
    
    return this.http.get(`${this.baseUrl}Projects/GetListTreeProjectDetail/${id}/H/%20`);
  }
  sortMedium(id) {
    return this.http.get(`${this.baseUrl}Projects/GetListTreeProjectDetail/${id}/M/%20`);
  }
  sortLow(id) {
    return this.http.get(`${this.baseUrl}Projects/GetListTreeProjectDetail/${id}/L/%20`);
  }
}
