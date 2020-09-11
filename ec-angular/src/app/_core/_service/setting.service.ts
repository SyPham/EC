import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  baseUrl = environment.apiUrlEC;
  constructor(
    private http: HttpClient
  ) { }

  getAllSetting() {
    return this.http.get(this.baseUrl + 'Setting/GetAllSetting', {});
  }

  AddStir(entity) {
    return this.http.post(this.baseUrl + 'Setting/Create', entity);
  }
}
