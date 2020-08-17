import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleNoService {
  baseUrl = environment.apiUrlEC;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.baseUrl + 'ArticleNo/GetAll', {});
  }
  getArticleNoByModelNoID(modelNoID) {
    return this.http.get(this.baseUrl + 'ArticleNo/getArticleNoByModelNoID/' + modelNoID, {});
  }
}
