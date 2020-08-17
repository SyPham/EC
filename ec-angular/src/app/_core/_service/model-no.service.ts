import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelNoService {
  baseUrl = environment.apiUrlEC;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.baseUrl + 'ModelNo/GetAll', {});
  }
  getModelNoByModelNameID(modelNameID) {
    return this.http.get(this.baseUrl + 'ModelNo/getModelNoByModelNameID/' + modelNameID, {});
  }
}
