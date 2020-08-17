import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtProcessService {
  baseUrl = environment.apiUrlEC;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.baseUrl + 'ArtProcess/GetAll', {});
  }
  getArtProcessByArticleNoID(articleNoID) {
    return this.http.get(this.baseUrl + 'ArtProcess/getArtProcessByArticleNoID/' + articleNoID, {});
  }
  GetAllProcess() {
    return this.http.get(this.baseUrl + 'Process/GetAll', {});
  }
}
