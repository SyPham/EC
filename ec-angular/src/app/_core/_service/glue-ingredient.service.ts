import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../_model/pagination';
import { IIngredient } from '../_model/Ingredient';
import { IGlue } from '../_model/glue';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class GlueIngredientService {
  baseUrl = environment.apiUrlEC;
  gueIngredientSource = new BehaviorSubject<object>({});
  currentGlueIngredient = this.gueIngredientSource.asObservable();
  flagSource = new BehaviorSubject<string>("0");
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }
  getIngredients(glueid, page?, itemsPerPage?): Observable<PaginatedResult<IIngredient[]>> {
    const paginatedResult: PaginatedResult<IIngredient[]> = new PaginatedResult<IIngredient[]>();
    return this.http.get<IIngredient[]>
    (`${this.baseUrl}GlueIngredient/GetIngredientsByGlueID/${glueid}`, { observe: 'response'})
      .pipe(
        map(response => {
          // console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }
  getGlues(page?, itemsPerPage?): Observable<PaginatedResult<IGlue[]>> {
    const paginatedResult: PaginatedResult<IGlue[]> = new PaginatedResult<IGlue[]>();
    return this.http.get<IGlue[]>(`${this.baseUrl}GlueIngredient/getAllGlues/${page}/${itemsPerPage}`, { observe: 'response'})
      .pipe(
        map(response => {
          // console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }
  
  mappGlueIngredient(glueIngredient) {
    return this.http.post(`${this.baseUrl}GlueIngredient/MapGlueIngredient`, glueIngredient);
  }
  delete(glueid, ingredient) {
    return this.http.get(`${this.baseUrl}GlueIngredient/${glueid}/${ingredient}/delete`);
  }
  editPercentage(glueIngredient) {
    return this.http.put(`${this.baseUrl}GlueIngredient/editPercentage`,glueIngredient);
  }
  editAllow(glueIngredient) {
    return this.http.put(`${this.baseUrl}GlueIngredient/editAllow`,glueIngredient);
  }
  getDetail(id: number) {
    return this.http.get(this.baseUrl + `GlueIngredient/${id}/detail`);
  }
}
