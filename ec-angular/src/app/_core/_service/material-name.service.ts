import { IMaterialName } from './../_model/material-name';
import { IPartname } from './../_model/partname';
import { ModalName } from './../_model/modal-name';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialNameService {

  baseUrl = environment.apiUrlEC;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllMaterial() {
    return this.http.get<IMaterialName[]>(this.baseUrl + 'MaterialName/GetAll', {});
  }

  create(modal: IMaterialName) {
    return this.http.post(this.baseUrl + 'MaterialName/Create', modal);
  }
  update(modal: IMaterialName) {
    return this.http.put(this.baseUrl + 'MaterialName/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'MaterialName/Delete/' + id);
  }
}
