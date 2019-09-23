import { Injectable } from '@angular/core';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  public info(message: string, title?:string) {
    this.showNotifications(message, 1, title);
  }

  public success(message: string, title?:string) {
    this.showNotifications(message, 2, title);
  }

  public warning(message: string, title?:string) {
    this.showNotifications(message, 3, title);
  }

  public danger(message: string, title?:string) {
    this.showNotifications(message, 3, title);
  }

  private showNotifications(message: string, index: number, title?: string) {
    const type = ['', 'primary', 'success', 'warning', 'danger'];
    
    $.notify({
        icon: 'notifications',
        title: title,
        message: message
    }, {
        type: type[index],
        timer: 2000,
        placement: {
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
