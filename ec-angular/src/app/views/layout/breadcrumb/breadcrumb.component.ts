import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { IBreadcrumb } from './breadcrumb.interface';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[];
  level: number ;
  public ADMIN = 1;
  public SUPERVISOR = 2;
  public STAFF = 3;
  public WORKER = 4;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // console.log('BreadcrumbComponent: ', this.activatedRoute);
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).pipe(map(() => this.activatedRoute)).subscribe((e) => {
      // console.log('ngOnInit breadcrumb: ', e);
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });
    this.level = JSON.parse(localStorage.getItem('level')).level as number ;
  }
  /**
   * Recursively build breadcrumb according to activated route.
   * @param route
   * @param url
   * @param breadcrumbs
   */
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    // debugger
    // If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let isClickable = route.routeConfig && route.routeConfig.data && route.routeConfig.data.isClickable;
    let path = route.routeConfig && route.routeConfig.data ? 'ec/' + route.routeConfig.path : '';
    // console.log(route.routeConfig);
    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith('/');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split('/')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path;
    const breadcrumb: IBreadcrumb = {
        label,
        url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    if (route.firstChild) {
        // If we are not on our current path yet,
        // there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
  gotoRouter(data) {
    // console.log(data)

    if (data.label === 'Ingredient' ) {
      this.router.navigate(['/ec/setting/ingredient']);
    }
    if (data.label === 'Todolist' ) {
      this.router.navigate(['/ec/execution/todolist']);
    }
    if (data.label === 'Home') {
      if (this.level === this.ADMIN || this.level === this.SUPERVISOR || this.level === this.STAFF) {
        this.router.navigate(['/ec/establish/bpfc']);
      } else {
        this.router.navigate(['/ec/execution/todolist']);
      }
    }
  }
}
