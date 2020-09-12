import { Directive, AfterViewInit, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autoselect]'
})
export class AutoSelectDirective implements AfterViewInit {
  @HostListener('focus') onFocus() {
    setTimeout( () => {
      this.host.nativeElement.select();
    }, 0);
  }
  @HostListener('ngModelChange', ['$event']) onChange(value) {
    const input = value.split('-') || [];
    if (input[2]?.length === 8) {
        setTimeout(() => {
          this.host.nativeElement.select();
        }, 0);
    }
  }
  constructor(private host: ElementRef) { }
  ngAfterViewInit() {
  }
}
