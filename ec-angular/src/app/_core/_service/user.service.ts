import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserGetAll } from '../_model/user';
import { PaginatedResult } from '../_model/pagination';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }

  constructor(private http: HttpClient) { }
  delete(id) { return this.http.delete(`${this.baseUrl}Users/Delete/${id}`); }
  rename(edit) { return this.http.post(`${this.baseUrl}Users/rename`, edit, {headers: httpOptions.headers}); }
  update(update) { return this.http.post(`${this.baseUrl}Users/Update`, update); }
  getUsers(page = 1, pageSize = 10, search = '%20') {
    return this.http.get(`${this.baseUrl}Users/GetAllPaging/${page}/${pageSize}/${search}`);
  }
  create(create) { return this.http.post(`${this.baseUrl}Users/Create`, create); }
  getAllUsers(page?, pageSize? ): Observable<PaginatedResult<UserGetAll[]>> {
    const paginatedResult: PaginatedResult<UserGetAll[]> = new PaginatedResult<
    UserGetAll[]
    >();
    return this.http
      .get<UserGetAll[]>(`${this.baseUrl}Users/GetAllUsers/${page}/${pageSize}`, {
        observe: 'response'
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
              );
            }
          return paginatedResult;
        })
      );
  }
  search(page?, pageSize?, text = '%20' ): Observable<PaginatedResult<UserGetAll[]>> {
    const paginatedResult: PaginatedResult<UserGetAll[]> = new PaginatedResult<
    UserGetAll[]
    >();
    return this.http
      .get<UserGetAll[]>(`${this.baseUrl}Users/GetAllUsers/${page}/${pageSize}/${text}`, {
        observe: 'response'
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
              );
            }
          return paginatedResult;
        })
      );
  }
  changeAvatar(img) {
    return this.http.post(this.baseUrl + 'Users/ChangedAvatar', img);
  }
  getRole() {
    return this.http.get(`${this.baseUrl}Roles/GetAll`);
  }
}
