import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IGlue } from '../_model/glue';
import { IMakeGlue } from '../_model/make-glue';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class MakeGlueService {
  baseUrl = environment.apiUrlEC;
  gueIngredientSource = new BehaviorSubject<object>({});
  currentMakeGlue = this.gueIngredientSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }

  getAllGlues() {
    return this.http.get<IGlue[]>(this.baseUrl + 'MakeGlue/getAllGlues', {});
  }
 // GetGlueWithIngredientByGlueCode
  getGlueWithIngredientByGlueCode(code: string) {
    return this.http.get<IMakeGlue[]>(this.baseUrl + 'MakeGlue/GetGlueWithIngredientByGlueCode/' + code);
  }
  getGlueWithIngredientByGlueID(glueID) {
    return this.http.get<IMakeGlue[]>(this.baseUrl + 'MakeGlue/getGlueWithIngredientByGlueID/' + glueID);
  }
  getGlueWithIngredientByGlueName(glueID) {
    return this.http.get<IMakeGlue[]>(this.baseUrl + 'MakeGlue/getGlueWithIngredientByGlueName/' + glueID);
  }
  getMakeGlueByGlueID(id: number) {
    return this.http.get<IMakeGlue[]>(this.baseUrl + 'MakeGlue/getGlueIngredientByGlueID/' + id, {});
  }
  getAllModalName() {
    return this.http.get<IGlue[]>(this.baseUrl + 'ModelName/FilterByApprovedStatus', {});
  }
  getAllModalNo(id: number) {
    return this.http.get<IMakeGlue[]>(this.baseUrl + 'ModelNo/GetModelNoByModelNameID/' + id, {});
  }
  Guidance(guidance) {
    return this.http.post(this.baseUrl + 'MakeGlue/Guidance', guidance);
  }
  getMixingInfoByGlueID(id) {
    return this.http.get(this.baseUrl + 'MakeGlue/GetMixingInfoByGlueID/' + id, {});

  }
  deliveredHistory() {
    return this.http.get(this.baseUrl + 'MakeGlue/DeliveredHistory', {});

  }
}
