import { Plan } from './../_model/plan';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ModalName } from '../_model/modal-name';
import { Line } from '../_model/line';
import { IGlue } from '../_model/glue';
@Injectable({
  providedIn: 'root'
})
export class PlanService {

  baseUrl = environment.apiUrlEC;
  ModalPlanSource = new BehaviorSubject<number>(0);
  currentModalPlan = this.ModalPlanSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Plan[]>(this.baseUrl + 'Plan/GetAll', {});
  }
  getAllModalName() {
    return this.http.get<ModalName[]>(this.baseUrl + 'ModelName/GetAll', {});
  }
  getAllLine() {
    return this.http.get<Line[]>(this.baseUrl + 'Line/GetAll', {});
  }
  getAllGlue() {
    return this.http.get<IGlue[]>(this.baseUrl + 'Glue/GetAll', {});
  }
  create(modal: Plan) {
    return this.http.post(this.baseUrl + 'Plan/Create', modal);
  }
  update(modal: Plan) {
    return this.http.put(this.baseUrl + 'Plan/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Plan/Delete/' + id);
  }
  getLines(buildingID) {
    return this.http.get<Plan[]>(this.baseUrl + 'Plan/getLines/' + buildingID, {});
  }
  getModelNames() {
    return this.http.get<Plan[]>(this.baseUrl + 'Plan/GetModelNames', {});
  }
  getGlueByBuilding(buildingID) {
    return this.http.get(this.baseUrl + 'Plan/GetGlueByBuilding/' + buildingID);
  }
  getGlueByBuildingModelName(buildingID, modelname) {
    return this.http.get(`${this.baseUrl}Plan/getGlueByBuildingModelName/${buildingID}/${modelname}`);
  }
  summary(buildingID) {
    return this.http.get(this.baseUrl + 'Plan/summary/' + buildingID);
  }
}
