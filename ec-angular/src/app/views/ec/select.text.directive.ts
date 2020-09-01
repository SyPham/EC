import { Directive, AfterViewInit, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autofocustext]'
})
export class SelectTextDirective implements AfterViewInit {

  @HostListener('focus') onBlur() {
    setTimeout( () => {
      this.host.nativeElement.select();
    }, 0);
  }

  constructor(private host: ElementRef) { }
  ngAfterViewInit() {
    this.host.nativeElement.focus();

  }
}
