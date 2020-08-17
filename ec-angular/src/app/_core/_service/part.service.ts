import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PartService {
  baseUrl = environment.apiUrlEC;
  ModalNameSource = new BehaviorSubject<number>(0);
  currentModalName = this.ModalNameSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getAllPart() {
    return this.http.get(this.baseUrl + 'Part/GetAll', {});
  }

  create(model) {
    return this.http.post(this.baseUrl + 'Part/Create', model);
  }
  update(model) {
    return this.http.put(this.baseUrl + 'Part/Update', model);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Part/Delete/' + id);
  }
}
