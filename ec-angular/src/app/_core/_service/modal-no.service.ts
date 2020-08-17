import { ModalNo } from './../_model/modal-no';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ModalNoService {
  baseUrl = environment.apiUrlEC;
  ModalNoSource = new BehaviorSubject<number>(0);
  currentModalNo = this.ModalNoSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllModalNo() {
    return this.http.get<ModalNo[]>(this.baseUrl + 'ModelNo/GetAll', {});
  }

  create(modal: ModalNo) {
    return this.http.post(this.baseUrl + 'ModelNo/Create', modal);
  }
  update(modal: ModalNo) {
    return this.http.put(this.baseUrl + 'ModelNo/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'ModelNo/Delete/' + id);
  }
  getbyid(id: number) {
    return this.http.get(this.baseUrl + 'ModelNo/GetById/' + id);
  }
}
