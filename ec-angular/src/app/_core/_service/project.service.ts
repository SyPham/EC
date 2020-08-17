import { Injectable } from '@angular/core';
import { PaginatedResult } from '../_model/pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../_model/project';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  projectSource = new BehaviorSubject<object>({});
  currentProject = this.projectSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) {}

  getProjects(page?, itemsPerPage?): Observable<PaginatedResult<Project[]>> {
    const paginatedResult: PaginatedResult<Project[]> = new PaginatedResult<
      Project[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Project[]>(this.baseUrl + 'Projects/GetProjects', {
        observe: 'response',
        params,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
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

  create(project: any) {
    return this.http.post(
      this.baseUrl + 'Projects/create',
      project,
      httpOptions
    );
  }

  getAlls() {
    return this.http.get<Project[]>(this.baseUrl + 'Projects/GetAll');
  }

  changeStatus(id: number) {
    return this.http.get(this.baseUrl + 'Projects/Open/' + id);
  }
  clone(id: number) {
    return this.http.get(this.baseUrl + 'Projects/Clone/' + id);
  }
  update(project: Project) {
    return this.http.post(
      this.baseUrl + 'Projects/Update',
      project,
      httpOptions
    );
  }
  delete(id: any) {
    return this.http.delete(
      this.baseUrl + 'Projects/DeleteProject/' + id,
      httpOptions
    );
  }
  onOrOff(projectId: number) {
    return this.http.get(`${this.baseUrl}Projects/open/${Number(projectId)}`);
  }
  search(page?, itemsPerPage?, text?): Observable<PaginatedResult<Project[]>> {
    const paginatedResult: PaginatedResult<Project[]> = new PaginatedResult<
      Project[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Project[]>(this.baseUrl + 'Projects/search/' + text, {
        observe: 'response',
        params,
      })
      .pipe(
        map(response => {
          console.log(response);
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
