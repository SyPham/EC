import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IRole } from '../_model/role';
import { PaginatedResult } from '../_model/pagination';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl = environment.apiUrl;
  messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
  constructor(private http: HttpClient) { }
  delete(id) { return this.http.delete(`${this.baseUrl}Roles/DeleteRole/${id}`); }
  update(update) { return this.http.post(`${this.baseUrl}Roles/Update`, update); }
  create(create) { return this.http.post(`${this.baseUrl}Roles/Create`, create); }
  getRoles(page?, pageSize? ): Observable<PaginatedResult<IRole[]>> {
    const paginatedResult: PaginatedResult<IRole[]> = new PaginatedResult<
    IRole[]
    >();
    return this.http
      .get<IRole[]>(`${this.baseUrl}Roles/GetRoles/${page}/${pageSize}`, {
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
  search(page?, pageSize? , text = '%20'): Observable<PaginatedResult<IRole[]>> {
    const paginatedResult: PaginatedResult<IRole[]> = new PaginatedResult<
    IRole[]
    >();
    return this.http
      .get<IRole[]>(`${this.baseUrl}Roles/GetRoles/${page}/${pageSize}/${text}`, {
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

}
