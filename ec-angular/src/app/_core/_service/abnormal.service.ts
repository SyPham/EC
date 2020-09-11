import { Injectable } from '@angular/core';
import { PaginatedResult } from '../_model/pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Oc } from '../_model/oc';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class AbnormalService {
  baseUrl = environment.apiUrlEC;
  constructor(private http: HttpClient) {}
  hasLock(ingredient, building, batch) {
    return this.http.get(`${this.baseUrl}Abnormal/HasLock/${ingredient}/${building}/${batch}`);
  }
  getBatchByIngredientID(ingredientID) {
    return this.http.get(`${this.baseUrl}Abnormal/GetBatchByIngredientID/${ingredientID}`);
  }
  getAll() {
    return this.http.get(this.baseUrl + 'Abnormal/GetAll', {});
  }
  create(model) {
    return this.http.post(this.baseUrl + 'Abnormal/Create', model);
  }
  createRange(model) {
    return this.http.post(this.baseUrl + 'Abnormal/CreateRange', model);
  }
  update(model) {
    return this.http.put(this.baseUrl + 'Abnormal/Update', model);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Abnormal/Delete/' + id);
  }
  getBuildingByIngredientAndBatch(ingredient, batch) {
    return this.http.get(`${this.baseUrl}Abnormal/GetBuildingByIngredientAndBatch/${ingredient}/${batch}`);
  }
}
