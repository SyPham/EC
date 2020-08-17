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
export class PartName1Service {
  baseUrl = environment.apiUrlEC;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllPartName1() {
    return this.http.get<IPartname[]>(this.baseUrl + 'PartName/GetAll', {});
  }

  create(modal: IPartname) {
    return this.http.post(this.baseUrl + 'PartName/Create', modal);
  }
  update(modal: IPartname) {
    return this.http.put(this.baseUrl + 'PartName/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'PartName/Delete/' + id);
  }
}
