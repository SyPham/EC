import { Directive, AfterViewInit, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private host: ElementRef) { }
  // @Input('autofocus') focusStatus: boolean;
  ngAfterViewInit() {
      this.host.nativeElement.focus();
  }
  // ngOnChanges(changes) {
  //   if (changes.focusStatus) {
  //     console.log('input changed', changes);

  //     if (changes.focusStatus.currentValue === false
  //       || changes.focusStatus.currentValue === null
  //       || changes.focusStatus.currentValue === undefined) {
  //       this.host.nativeElement.blur();
  //     }
  //   } else {
  //     this.host.nativeElement.focus();
  //   }
  // }
}
