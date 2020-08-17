import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tutorial } from '../_model/tutorial';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class OcService {
  baseUrl = environment.apiUrl;
  messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
  constructor(private http: HttpClient) { }
  delete(id) { return this.http.delete(`${this.baseUrl}Ocs/Delete/${id}`); }
  rename(edit) { return this.http.post(`${this.baseUrl}Ocs/rename`, edit); }
  getOCs() {
    return this.http.get(`${this.baseUrl}Ocs/GetListTree`);
  }
  createMainOC(oc) { return this.http.post(`${this.baseUrl}Ocs/CreateOc`, oc); }
  createSubOC(oc) { return this.http.post(`${this.baseUrl}Ocs/CreateSubOC`, oc); }
}
