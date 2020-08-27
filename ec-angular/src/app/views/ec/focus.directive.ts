import { Directive, AfterViewInit, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input('autofocus') autofocusStatus: boolean;
  @HostListener('focusout') onFocusout() {
    setTimeout( () => {
      this.host.nativeElement.focus();
      this.host.nativeElement.select();
    }, 0);
  }
  @HostListener('focus') onBlur() {
    setTimeout( () => {
      this.host.nativeElement.select();
    }, 0);
  }

  constructor(private host: ElementRef) { }
  ngAfterViewInit() {
    if (this.autofocusStatus === true) {
      setTimeout(() => {
        this.host.nativeElement.focus();
        this.host.nativeElement.select();
      }, 0);
    }
  }
}
