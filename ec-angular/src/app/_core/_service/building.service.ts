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
export class BuildingService {
  baseUrl = environment.apiUrlEC;
  messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
  constructor(private http: HttpClient) { }
  delete(id) { return this.http.delete(`${this.baseUrl}Building/Delete/${id}`); }
  rename(edit) { return this.http.put(`${this.baseUrl}Building/Update`, edit); }

  getBuildingsAsTreeView() {
    return this.http.get(`${this.baseUrl}Building/GetAllAsTreeView`);
  }
  getBuildingsForSetting() {
    return this.http.get(`${this.baseUrl}Building/GetBuildingsForSetting`);
  }
  createMainBuilding(Building) { return this.http.post(`${this.baseUrl}Building/CreateMainBuilding`, Building); }
  createSubBuilding(Building) { return this.http.post(`${this.baseUrl}Building/CreateSubBuilding`, Building); }
}
