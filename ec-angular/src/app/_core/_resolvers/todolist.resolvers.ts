import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TodolistService } from '../_service/todolist.service';

@Injectable()
export class TodolistResolver implements Resolve<object> {

  constructor(
    private todolistService: TodolistService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<object> {
    return this.todolistService.getTasks().pipe(
      catchError(error => {
        console.log(error);
        this.alertify.error('Problem retrieving data');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return of(null);
      })
    );
  }
}
