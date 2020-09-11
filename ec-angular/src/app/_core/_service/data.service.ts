import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  messageSource = new BehaviorSubject<number>(0);
  SourceLang = new BehaviorSubject<any>('en');
  currentMessage = this.messageSource.asObservable();
  currentSourceLang = this.SourceLang.asObservable();
  constructor() { }
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
  changeLang(message) {
    this.SourceLang.next(message);
  }
}
