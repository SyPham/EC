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
export class StirService {
  baseUrl = environment.apiUrlEC;
  constructor(private http: HttpClient) { }
  getStirInfo(glueName) {
    return this.http.get(`${this.baseUrl}Stir/GetStirInfo/${glueName}`);
  }
  getRPM(mixingInfoID, building, startTime, endTime ) {
    return this.http.get(`${this.baseUrl}Stir/GetRPM/${mixingInfoID}/${building}/${startTime}/${endTime}`);
  }
  getRPMByMachineCode(machineCode, startTime, endTime) {
    return this.http.get(`${this.baseUrl}Stir/GetRPMByMachineCode/${machineCode}/${startTime}/${endTime}`);
  }
}
