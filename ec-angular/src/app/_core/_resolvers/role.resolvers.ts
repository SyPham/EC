import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';
import { UserGetAll } from '../_model/user';
import { IRole } from '../_model/role';
import { RoleService } from '../_service/role.service';

@Injectable()
export class RoleResolver implements Resolve<IRole[]> {
 public page: number;
 public pageSize: number;
 public search: string;
  constructor(
    private roleService: RoleService,
    private router: Router,
    private alertify: AlertifyService
  ) {
    this.page = 1;
    this.pageSize = 10;
  }
  resolve(route: ActivatedRouteSnapshot): Observable<IRole[]> {
    return this.roleService.getRoles(this.page, this.pageSize).pipe(
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
