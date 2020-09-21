import { Directive, AfterViewInit, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autofocusSearch]'
})
export class SearchDirective implements AfterViewInit {
  @HostListener('ngModelChange', ['$event']) onChange(value) {
    const input = value.split('-') || [];
    if (input[2]?.length === 8) {
      setTimeout(() => {
        this.host.nativeElement.select();
      }, 300);
    }
  }
  @HostListener('focus') onBlur() {
    setTimeout( () => {
      this.host.nativeElement.select();
    }, 300);
  }

  constructor(private host: ElementRef) { }
  ngAfterViewInit() {
      setTimeout(() => {
        this.host.nativeElement.focus();
        this.host.nativeElement.select();
      }, 300);
    }
}
