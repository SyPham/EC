import { Directive, AfterViewInit, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autoselect]'
})
export class AutoSelectDirective implements AfterViewInit {
  @HostListener('focus') onFocus() {
    setTimeout( () => {
      this.host.nativeElement.select();
    }, 300);
  }
  constructor(private host: ElementRef) { }
  ngAfterViewInit() {
  }
}
