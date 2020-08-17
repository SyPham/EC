import { Injectable } from "@angular/core";
import { Detail } from "../_model/projectDetail";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { ProjectDetailService } from "../_service/projectDetail.service";
import { AlertifyService } from "../_service/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ProjectDetailResolver implements Resolve<Detail> {
  pageNumber = 1;
  pageSize = 20;
  constructor(
    private projectDetailService: ProjectDetailService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Detail> {
    const id: number = route.params.id;
    return this.projectDetailService.getUserByProjectID(id).pipe(
      catchError(error => {
        this.alertify.error("Problem retrieving data");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return of(null);
      })
    );
  }
}
