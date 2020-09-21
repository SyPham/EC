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
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  baseUrl = environment.apiUrlEC;
  ingredientSource = new BehaviorSubject<number>(0);
  currentIngredient = this.ingredientSource.asObservable();
  constructor(private http: HttpClient) { }
  getIngredients(page?, itemsPerPage?): Observable<PaginatedResult<IIngredient[]>> {
    const paginatedResult: PaginatedResult<IIngredient[]> = new PaginatedResult<IIngredient[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }


    return this.http.get<IIngredient[]>(this.baseUrl + 'ingredient/getingredients', { observe: 'response', params})
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
  search(page?, itemsPerPage?, text?): Observable<PaginatedResult<IIngredient[]>> {
    const paginatedResult: PaginatedResult<IIngredient[]> = new PaginatedResult<IIngredient[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }


    return this.http.get<IIngredient[]>(this.baseUrl + 'ingredient/Search/' + text, { observe: 'response', params})
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
  getAllIngredient() {
    return this.http.get<IIngredient[]>(this.baseUrl + 'ingredient/GetAll', {});
  }
  getByID(Id) {
    return this.http.get<IIngredient>(this.baseUrl + 'ingredient/GetbyID/' + Id, {});
  }
  scanQRCode(qrCode) {
    return this.http.get(this.baseUrl + 'ingredient/ScanQRCode/' + qrCode, {});
  }
  scanQRCodeFromChemicalWareHouse(qrCode, building, userid) {
    return this.http.get(`${this.baseUrl}ingredient/ScanQRCodeFromChemialWareHouse/${qrCode}/${building}/${userid}`, {});
  }

  scanQRCodeOutput(qrCode, building, userid) {
    return this.http.get(`${this.baseUrl}ingredient/ScanQRCodeOutput/${qrCode}/${building}/${userid}`, {});
  }
  getAllSupplier() {
    return this.http.get<ISupplier[]>(this.baseUrl + 'Suppier/GetAll', {});
  }

  getAllIngredientInfo() {
    return this.http.get(this.baseUrl + `ingredient/GetAllIngredientInfo`, {});
  }

  getAllIngredientInfoOutput() {
    return this.http.get(this.baseUrl + `ingredient/GetAllIngredientInfoOutPut`, {});
  }

  getAllIngredientInfoByBuildingName(BuildingName: string) {
    return this.http.get(this.baseUrl + `ingredient/GetAllIngredientInfoByBuildingName/${BuildingName}`, {});
  }

  getAllIngredientInfoReport() {
    return this.http.get(this.baseUrl + `ingredient/GetAllIngredientInfoReport`, {});
  }

  getAllIngredientInfoReportByBuildingName(BuildingName: string) {
    return this.http.get(this.baseUrl + `ingredient/GetAllIngredientInfoReportByBuildingName/${BuildingName}`, {});
  }

  searchInventory(min, max) {
    return this.http.get(`${this.baseUrl}ingredient/Search/${min}/${max}`, {});
  }

  searchInventoryByBuildingName(min, max, buildingName) {
    return this.http.get(`${this.baseUrl}ingredient/SearchWithBuildingName/${min}/${max}/${buildingName}`, {});
  }
  deleteIngredientInfo(id: number , code: string, qty: number, batch: string) {
    return this.http.delete(this.baseUrl + `ingredient/DeleteIngredientInfo/${id}/${code}/${qty}/${batch}`);
  }
  UpdateConsumption(qrcode: string , batch: string, consump: number) {
    return this.http.post(this.baseUrl + `ingredient/UpdateConsumptionIngredientReport/${qrcode}/${batch}/${consump}`, {});
  }
  UpdateConsumptionOfBuilding(entity) {
    return this.http.post(this.baseUrl + 'ingredient/UpdateConsumptionOfBuildingIngredientReport', entity);
  }
  createSub(supplier: ISupplier) {
    return this.http.post(this.baseUrl + 'suppier/create', supplier);
  }
  updateSub(supplier: ISupplier) {
    return this.http.put(this.baseUrl + 'suppier/update', supplier);
  }

  deleteSub(id: number) {
    return this.http.delete(this.baseUrl + 'suppier/delete/' + id);
  }

  sortBySup(glueid: number, id: number) {
    return this.http.get<ISupplier[]>(this.baseUrl + `GlueIngredient/GetIngredientsByGlueID/${glueid}/${id}` );
  }

  getIngredientsByGlueID(glueid: number) {
    return this.http.get<ISupplier[]>(this.baseUrl + `GlueIngredient/GetIngredientsByGlueID/${glueid}` );
  }

  create(ingredient: IIngredient) {
    return this.http.post(this.baseUrl + 'ingredient/create1', ingredient);
  }

  update(ingredient: IIngredient) {
    return this.http.put(this.baseUrl + 'ingredient/update', ingredient);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'ingredient/delete/' + id);
  }

  changeIngredient(ingredient) {
    this.ingredientSource.next(ingredient);
  }

  import(file, createdBy) {
    const formData = new FormData();
    formData.append('UploadedFile', file);
    formData.append('CreatedBy', createdBy);
    return this.http.post(this.baseUrl + 'ingredient/Import', formData);
  }

  downloadFile() {
    return this.http.post(this.baseUrl + 'ingredient/ExcelExport', {});
  }

  GetQrcodeByid(id) {
    return this.http.get(this.baseUrl + `ingredient/GetbyID/${id}`);
  }

  UpdatePrint(ingredient) {
    return this.http.put(this.baseUrl + 'ingredient/UpdatePrint', ingredient);
  }
  checkIncoming(ingredient, batch, building) {
    return this.http.get(`${this.baseUrl}ingredient/CheckIncoming/${ingredient}/${batch}/${building}`, {});
  }
}
