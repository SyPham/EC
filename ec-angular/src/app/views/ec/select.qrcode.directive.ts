import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSelectQrCode]'
})
export class SelectQrCodeDirective {

  @HostListener('focus') onFocus() {
    setTimeout(() => {
      this.host.nativeElement.select();
    }, 0);
  }
  @HostListener('ngModelChange', ['$event']) onChange(value) {
    const input = value;
    if (input?.length === 8) {
      setTimeout(() => {
        this.host.nativeElement.select();
      }, 0);
    }
  }
  constructor(private host: ElementRef) { }

}
