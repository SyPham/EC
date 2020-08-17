import { Injectable } from '@angular/core';
import { Project } from '../_model/project';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from '../_service/project.service';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProjectResolver implements Resolve<Project[]> {
  pageNumber = 1;
  pageSize = 10;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Project[]> {
    return this.projectService.getProjects(this.pageNumber, this.pageSize).pipe(
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
