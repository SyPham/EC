import { Line } from './../_model/line';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class LineService {
  baseUrl = environment.apiUrlEC;
  LineSource = new BehaviorSubject<number>(0);
  currentLine = this.LineSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllLine() {
    return this.http.get<Line[]>(this.baseUrl + 'Line/GetAll', {});
  }

  create(modal: Line) {
    return this.http.post(this.baseUrl + 'Line/Create', modal);
  }
  update(modal: Line) {
    return this.http.put(this.baseUrl + 'Line/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Line/Delete/' + id);
  }
}
