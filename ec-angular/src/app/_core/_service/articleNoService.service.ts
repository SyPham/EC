import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { IArticleNo } from '../_model/Iarticle-no';
import { PaginatedResult } from '../_model/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleNoService {
  baseUrl = environment.apiUrlEC;
  constructor(private http: HttpClient) { }
  getArticleNos(page?, itemsPerPage?): Observable<PaginatedResult<object[]>> {
  const paginatedResult: PaginatedResult<object[]> = new PaginatedResult<object[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  return this.http.get<object[]>(this.baseUrl + 'ArticleNo/getArticleNos', { observe: 'response', params})
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
  getAlls() {
    return this.http.get<IArticleNo[]>(this.baseUrl + 'ArticleNo/GetAll', {});
  }
  getArticleNoByModelNameID(modelNameID) {
    return this.http.get<IArticleNo[]>(this.baseUrl + 'ArticleNo/getArticleNoByModelNameID/' + modelNameID , {});
  }
  getArticleNoByModelNoID(modelNoID) {
    return this.http.get<IArticleNo[]>(this.baseUrl + 'ArticleNo/getArticleNoByModelNoID/' + modelNoID , {});
  }
  create(articleNo: IArticleNo) {
    return this.http.post(this.baseUrl + 'ArticleNo/create', articleNo);
  }
  update(articleNo: IArticleNo) {
    return this.http.put(this.baseUrl + 'ArticleNo/update', articleNo);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'ArticleNo/delete/' + id);
  }
}
