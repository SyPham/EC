import { Injectable } from '@angular/core';
import { PaginatedResult } from '../_model/pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IComment, ICommentTreeView } from '../_model/comment.interface';
import { ICommentModelName } from '../_model/comment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})

export class CommentService {
  baseUrl = environment.apiUrlEC;
  messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient) { }
  changeMessage(message) {
    this.messageSource.next(message);
  }
  getAllComments() {
    return this.http.get<ICommentModelName[]>(this.baseUrl + 'Comment/GetAll', {});
  }
  getAllCommentByBPFCEstablishID(BPFCEstablishID) {
    return this.http.get(`${this.baseUrl}Comment/GetAllCommentByBPFCEstablishID/${BPFCEstablishID}`, {});
  }
  create(modal: ICommentModelName) {
    return this.http.post(this.baseUrl + 'Comment/Create', modal);
  }
  update(modal: ICommentModelName) {
    return this.http.put(this.baseUrl + 'Comment/Update', modal);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Comment/Delete/' + id);
  }
}

