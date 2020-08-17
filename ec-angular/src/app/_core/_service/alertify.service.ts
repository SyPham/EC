import { Injectable } from '@angular/core';
import { resolve } from 'dns';
declare let alertify: any;
declare let Swal: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  public $swal = Swal;
  constructor() {}
  private Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  confirm(title: string, message: string, okCallback: () => void) {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        okCallback();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
    // alertify
    //   .confirm(message, (e) => {
    //     if (e) {
    //       okCallback();
    //     } else {
    //     }
    //   })
    //   .setHeader(title);
  }
  valid(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      Swal.fire({
        title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          rejects(false);
        }
      });
    });
  }
  validation(title: string, message: string) {
    Swal.fire(title, message, 'warning');
    // alertify
    //   .confirm(message)
    //   .setHeader(title);
  }

  success(message: string, noToast?: boolean) {
    if (!noToast) {
      this.Toast.fire({
        icon: 'success',
        title: message
      });
    } else {
    Swal.fire('Successfully!', message, 'success');
    }
  }

  error(message: string, noToast?: boolean) {
    if (!noToast) {
      this.Toast.fire({
        icon: 'error',
        title: message
      });
    } else {
     Swal.fire('Error!', message, 'error');
    }
    //alertify.error(message);
  }

  warning(message: string, noToast?: boolean) {
    if (!noToast) {
      this.Toast.fire({
        icon: 'warning',
        title: message
      });
    } else {
    Swal.fire('Warning!', message, 'warning');
    }
    //alertify.warring(message);
  }

  message(message: string, noToast?: boolean) {
    if (!noToast) {
      this.Toast.fire({
        icon: 'info',
        title: message
      });
    } else {
      Swal.fire('Info!', message, 'info');
    }
    //alertify.message(message);
  }
}
