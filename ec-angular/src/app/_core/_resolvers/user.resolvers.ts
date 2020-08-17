import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';
import { UserGetAll } from '../_model/user';

@Injectable()
export class UserResolver implements Resolve<UserGetAll[]> {
 public page: number;
 public pageSize: number;
 public search: string;
  constructor(
    private todolistService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {
    this.page = 1;
    this.pageSize = 10;
  }
  resolve(route: ActivatedRouteSnapshot): Observable<UserGetAll[]> {
    return this.todolistService.getAllUsers(this.page, this.pageSize).pipe(
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
