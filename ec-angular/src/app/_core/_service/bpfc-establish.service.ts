import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};
@Injectable({
  providedIn: 'root'
})
export class BPFCEstablishService {
  baseUrl = environment.apiUrlEC;
  materialSource = new BehaviorSubject<number>(0);
  currentIngredient = this.materialSource.asObservable();
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.baseUrl + 'BPFCEstablish/GetAll', {});
  }
  getAllBPFCByBuildingID(buildingID) {
    return this.http.get(this.baseUrl + 'BPFCEstablish/GetAllBPFCByBuildingID/' + buildingID, {});
  }
  getBPFCID(bpfcInfo) {
    return this.http.post(this.baseUrl + 'BPFCEstablish/GetBPFCID', bpfcInfo);
  }
  import(file, createdBy) {
    const formData = new FormData();
    formData.append('UploadedFile', file);
    formData.append('CreatedBy', createdBy);
    return this.http.post(this.baseUrl + 'BPFCEstablish/Import', formData);
  }
  done(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}BPFCEstablish/done/${modelNameID}/${userID}`, {});
  }
  approval(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}BPFCEstablish/approval/${modelNameID}/${userID}`, {});
  }
  release(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}BPFCEstablish/release/${modelNameID}/${userID}`, {});
  }
  reject(modelNameID, userID) {
    return this.http.get(`${this.baseUrl}BPFCEstablish/reject/${modelNameID}/${userID}`, {});
  }

  filterByApprovedStatus() { // FilterByApprovedStatus
    return this.http.get(this.baseUrl + 'BPFCEstablish/FilterByApprovedStatus', {});
  }
  filterByNotApprovedStatus() { // FilterByNotApprovedStatus
    return this.http.get(this.baseUrl + 'BPFCEstablish/FilterByNotApprovedStatus', {});
  }
  filterByFinishedStatus() { // filterByFinishedStatus
    return this.http.get(this.baseUrl + 'BPFCEstablish/FilterByFinishedStatus', {});
  }
  getAllBPFCStatus() { // filterByFinishedStatus
    return this.http.get(this.baseUrl + 'BPFCEstablish/getAllBPFCStatus', {});
  }
  getAllBPFCRecord() { // filterByFinishedStatus
    return this.http.get(this.baseUrl + 'BPFCEstablish/getAllBPFCRecord', {});
  }
  sendMailForPIC(email: string) {
    return this.http.get(this.baseUrl + 'BPFCEstablish/SendMailForPIC/' + email);
  }

  filterByStatus(status) {
    return this.http.get(`${this.baseUrl}BPFCEstablish/GetAllBPFCRecord/${status}/${'%20'}/${'%20'}`);
  }
  filterByStatusStartBuildingToEndBuilding(status, start, end) {
    return this.http.get(`${this.baseUrl}BPFCEstablish/GetAllBPFCRecord/${status}/${start}/${end}`);
  }
  filterByStartBuildingToEndBuilding(start, end) {
    return this.http.get(`${this.baseUrl}BPFCEstablish/GetAllBPFCRecord/${0}/${start}/${end}`);
  }
  updateSeason(entity) {
    return this.http.put(this.baseUrl + 'BPFCEstablish/UpdateSeason', entity);
  }
  AddHistoryBPFC(entity) {
    return this.http.post(this.baseUrl + 'BPFCEstablish/AddBPFCHistory', entity);
  }

  LoadHistoryBPFC(id?: number) {
    return this.http.get(this.baseUrl + `BPFCEstablish/LoadBPFCHistory/${id}` , {});
  }

  UpdateHistoryBPFC(entity) {
    return this.http.put(this.baseUrl + 'BPFCEstablish/UpdateBPFCHistory' , entity);
  }
}
