import { ModalName } from './../_model/modal-name';
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
export class ModalNameService {
  baseUrl = environment.apiUrlEC;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllModalName() {
    return this.http.get<ModalName[]>(this.baseUrl + 'ModelName/GetAll', {});
  }
  getAllModelNameForBPFCSchedule() {
    const url = `${this.baseUrl}ModelName/GetAllModelNameForBPFCSchedule`;
    return this.http.get<ModalName[]>(url);
  }
  getAllModelNameForAdmin() { 
    return this.http.get<ModalName[]>(this.baseUrl + 'ModelName/GetAllForAdmin', {});
  }
  filterByApprovedStatus() { // FilterByApprovedStatus
    return this.http.get<ModalName[]>(this.baseUrl + 'ModelName/FilterByApprovedStatus', {});
  }
  filterByNotApprovedStatus() { // FilterByNotApprovedStatus
    return this.http.get<ModalName[]>(this.baseUrl + 'ModelName/FilterByNotApprovedStatus', {});
  }
  filterByFinishedStatus() { // filterByFinishedStatus
    return this.http.get<ModalName[]>(this.baseUrl + 'ModelName/FilterByFinishedStatus', {});
  }
  getArticleNameQuantityByModelName(modelName) {
    return this.http.get(this.baseUrl + 'ModelName/GetArticleNameQuantityByModelName/' + modelName, {});
  }
  create(modal: ModalName) {
    return this.http.post(this.baseUrl + 'ModelName/Create', modal);
  }
  sendMailForPIC(email: string) {
    return this.http.get(this.baseUrl + 'ModelName/SendMailForPIC/' + email);
  }
  update(modal: ModalName) {
    return this.http.put(this.baseUrl + 'ModelName/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'ModelName/Delete/' + id);
  }
  cloneModelname(modelNameID, modelName, modelNo, processID) {
    const url = `${this.baseUrl}ModelName/CloneModelName/${modelNameID}/${modelName}/${modelNo}/${processID}`;
    return this.http.get(url, {});
  }
  clone(clone) {
    const url = `${this.baseUrl}ModelName/Clone`;
    return this.http.post(url, clone);
  }
  cloneArticleModelname(modelNameID, modelName, modelNo, article, processID) {
    const url = `${this.baseUrl}ModelName/cloneArticleModelname/${modelNameID}/${modelName}/${modelNo}/${article}/${processID}`;
    return this.http.get(url, {});
  }
  getModelNameByID(id) {
    return this.http.get(this.baseUrl + 'ModelName/getModelNameByID/' + id, {});
  }
  done(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}ModelName/done/${modelNameID}/${userID}`, {});
  }
  approval(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}ModelName/approval/${modelNameID}/${userID}`, {});
  }
  release(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}ModelName/release/${modelNameID}/${userID}`, {});
  }
  reject(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}ModelName/reject/${modelNameID}/${userID}`, {});
  }
  import(file, createdBy) {
    const formData = new FormData();
    formData.append('UploadedFile', file);
    formData.append('CreatedBy', createdBy);
    return this.http.post(this.baseUrl + 'ModelName/Import', formData);
  }
  filterModelNameByStatus(status) {
    return this.http.get(`${this.baseUrl}ModelName/GetModelNameForBPFCRecord/${status}/${'%20'}/${'%20'}`);
  }
  filterModelNameByStatusStartBuildingToEndBuilding(status, start, end) {
    return this.http.get(`${this.baseUrl}ModelName/GetModelNameForBPFCRecord/${status}/${start}/${end}`);
  }
  filterModelNameByStartBuildingToEndBuilding(start, end) {
    return this.http.get(`${this.baseUrl}ModelName/GetModelNameForBPFCRecord/${0}/${start}/${end}`);
  }
}
