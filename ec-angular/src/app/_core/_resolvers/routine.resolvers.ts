import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoutineService } from '../_service/routine.service';
import { Oc } from '../_model/oc';

@Injectable()
export class RoutineResolver implements Resolve<Oc[]> {

  constructor(
    private routineService: RoutineService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Oc[]> {
    return this.routineService.getOCs().pipe(
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
