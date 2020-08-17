import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Oc } from '../_model/oc';
import { HistoryService } from '../_service/history.service';

@Injectable()
export class HistoryResolver implements Resolve<object> {
  subtractDate: Date;
  currentDate: Date;
  daterange: Date [];
  constructor(
    private historyService: HistoryService,
    private router: Router,
    private alertify: AlertifyService
  ) {
    this.currentDate = new Date();
    this.subtractDate = new Date();
    this.subtractDate.setDate(this.subtractDate.getDate() - 5);
    this.daterange = [this.subtractDate, this.currentDate];
  }

  resolve(route: ActivatedRouteSnapshot): Observable<object> {
    return this.historyService.sortDateRange(this.subtractDate, this.currentDate).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return of(null);
      })
    );
  }
}
