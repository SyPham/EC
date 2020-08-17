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
export class TutorialService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  create(formData: FormData) {
    return this.http.post(this.baseUrl + 'Tutorial/Create', formData);
  }
  Edit(edit) {
    return this.http.post(this.baseUrl + 'Tutorial/Edit', edit);
  }
  delete(id: number) {
    return this.http.post(this.baseUrl + 'Tutorial/Delete', id);
  }
  getTutorials(id = 0) {
    return this.http.get<Tutorial[]>(`${this.baseUrl}Tutorial/GetListTree/${id}`);
  }
}
