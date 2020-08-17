import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IngredientService } from '../_service/ingredient.service';
import { AlertifyService } from '../_service/alertify.service';


@Injectable()
export class IngredientResolver implements Resolve<object[]> {
    pageNumber = 1;
    pageSize = 10;
    constructor(private ingredientService: IngredientService, private router: Router, private alertify: AlertifyService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<object[]> {
        return this.ingredientService.getIngredients(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }
}
