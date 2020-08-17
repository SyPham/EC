import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tutorial } from '../_model/tutorial';
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
export class BuildingUserService {
  baseUrl = environment.apiUrlEC;
  authUrl = environment.apiUrl;
  messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
  constructor(private http: HttpClient) { }
  getBuildingsAsTreeView() {
    return this.http.get(`${this.baseUrl}Building/GetAllAsTreeView`);
  }
  mappingUserWithBuilding(obj) {
    return this.http.post(`${this.baseUrl}BuildingUser/MappingUserWithBuilding`, obj);
  }
  removeBuildingUser(obj) {
    return this.http.post(`${this.baseUrl}BuildingUser/RemoveBuildingUser`, obj);
  }
  getAllUsers(page?, pageSize? ): Observable<PaginatedResult<object[]>> {
    const paginatedResult: PaginatedResult<object[]> = new PaginatedResult<
    object[]
    >();
    return this.http
      .get<object[]>(`${this.authUrl}Users/GetAllUsers/${page}/${pageSize}`, {
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
  deleteUser(id) { return this.http.delete(`${this.authUrl}Users/Delete/${id}`); }
  updateUser(update) { return this.http.post(`${this.authUrl}Users/Update`, update); }
  createUser(create) { return this.http.post(`${this.authUrl}Users/Create`, create); }
  getAllBuildingUsers() {
    return this.http.get(`${this.baseUrl}BuildingUser/getAllBuildingUsers`);
    }
  getBuildingUserByBuildingID(buildingID) {
    return this.http.get(`${this.baseUrl}BuildingUser/GetBuildingUserByBuildingID/${buildingID}`);
    }
}
