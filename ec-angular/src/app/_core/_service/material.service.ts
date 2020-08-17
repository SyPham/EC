import { ISupplier } from './../_model/Supplier';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IIngredient } from '../_model/Ingredient';
import { PaginatedResult } from '../_model/pagination';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  baseUrl = environment.apiUrlEC;
  materialSource = new BehaviorSubject<number>(0);
  currentIngredient = this.materialSource.asObservable();
  constructor(private http: HttpClient) { }
  getAllMaterial() {
    return this.http.get<ISupplier[]>(this.baseUrl + 'Material/GetAll', {});
  }

  create(material) {
    return this.http.post(this.baseUrl + 'Material/create', material);
  }
  update(material) {
    return this.http.put(this.baseUrl + 'Material/update', material);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Material/delete/' + id);
  }
  changeIngredient(material) {
    this.materialSource.next(material);
  }
}
