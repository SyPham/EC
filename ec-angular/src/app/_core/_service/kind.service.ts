import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KindService {
  baseUrl = environment.apiUrlEC;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllKind() {
    return this.http.get(this.baseUrl + 'Kind/GetAll', {});
  }

  create(model) {
    return this.http.post(this.baseUrl + 'Kind/Create', model);
  }
  update(model) {
    return this.http.put(this.baseUrl + 'Kind/Update', model);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Kind/Delete/' + id);
  }
}
