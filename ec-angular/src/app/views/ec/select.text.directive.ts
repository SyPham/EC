import { Directive, AfterViewInit, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autofocustext]'
})
export class SelectTextDirective implements AfterViewInit {

  @HostListener('focus') onBlur() {
    setTimeout( () => {
      this.host.nativeElement.select();
      this.host.nativeElement.value = '';
      console.log(this.host.nativeElement.value);
    }, 0);
  }

  constructor(private host: ElementRef) { }
  ngAfterViewInit() {
    this.host.nativeElement.focus();
    console.log(this.host.nativeElement.value);
    this.host.nativeElement.value = '';
  }
}
