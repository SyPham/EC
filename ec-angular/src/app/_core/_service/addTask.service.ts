import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
}
