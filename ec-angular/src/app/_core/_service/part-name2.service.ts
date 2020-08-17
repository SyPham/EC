import { IPartname2 } from './../_model/partname2';
import { IPartname } from './../_model/partname';
import { ModalName } from './../_model/modal-name';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class PartName2Service {
  baseUrl = environment.apiUrlEC;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllPartName2() {
    return this.http.get<IPartname2[]>(this.baseUrl + 'PartName2/GetAll', {});
  }

  create(modal: IPartname2) {
    return this.http.post(this.baseUrl + 'PartName2/Create', modal);
  }
  update(modal: IPartname2) {
    return this.http.put(this.baseUrl + 'PartName2/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'PartName2/Delete/' + id);
  }
}
