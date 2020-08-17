import { Injectable } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { CanActivate, Router , ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['login'], { queryParams: { uri: state.url }});
    return false;
  }
}

