import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../_model/project';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Manager, Member, Detail } from '../_model/projectDetail';
import { Task } from '../_model/Task';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {
  baseUrl = environment.apiUrl;
  titleManagerModal = 'Add Manager';
  constructor(private http: HttpClient) {}
  addManager(manager: Manager) {
    return this.http.post(
      this.baseUrl + 'Projects/AddManager',
      manager,
      httpOptions
    );
  }
  addMember(member: Member) {
    return this.http.post(
      this.baseUrl + 'Projects/AddMember',
      member,
      httpOptions
    );
  }
  getListUsers() {
    return this.http.get(this.baseUrl + 'Projects/GetUsers');
  }
  getAreas() {
    return this.http.get(this.baseUrl + 'Tasks/From');
  }
  getUserByProjectID(id: any): Observable<Detail> {
    const detail: Detail = new Detail();
    return this.http.get<Detail>(this.baseUrl + 'Projects/GetUserByProjectID/' + id).pipe(
      map(response => {
        console.log('getUserByProjectID: ', response);
        detail.createdBy = response.createdBy;
        detail.status  = response.status;
        detail.selectedManager = response.selectedManager;
        detail.selectedMember = response.selectedMember;
        detail.title = response.title;
        return detail;
      })
    );
  }
  follow(ID) {
    return this.http.get(`${this.baseUrl}Tasks/Follow/${ID}`).pipe(
      map(response => {
        console.log('Follow: ', response);
        return response;
      })
    );
  }
  delete(id: any) {
    return this.http.delete(
      this.baseUrl + 'Tasks/Delete/' + id,
      httpOptions
    );
  }
  done(id: any) {
    return this.http.get(
      this.baseUrl + 'Tasks/Done/' + id,
      httpOptions
    );
  }
 createMainTask(task: any) {
    return this.http.post(
      this.baseUrl + 'Tasks/CreateTask',
      task,
      httpOptions
    );
  }
  createSubTask(task: any) {
    return this.http.post(
      this.baseUrl + 'Tasks/CreateSubTask',
      task,
      httpOptions
    );
  }
}
