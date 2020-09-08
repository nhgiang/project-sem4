import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from "ng2-izitoast"
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationModalComponent } from '../core/notification-modal/notification-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private izitToast: Ng2IzitoastService, private modalService: BsModalService) { }

  error(msg: string) {
    this.izitToast.error({
      title: 'Error!',
      message: msg,
      position: 'topCenter',
      icon: 'fas fa-exclamation-circle',
      iconColor: '#ffffff',
      backgroundColor: '#dd2424',
      messageColor: '#ffffff',
      theme: 'dark',
      transitionIn: 'fadeIn'
    })
  }

  success(msg: string) {
    this.izitToast.success({
      title: 'Success!',
      message: msg,
      position: 'topCenter',
      icon: 'fas fa-check-circle',
      iconColor: 'white',
      backgroundColor: '#0fac53',
      messageColor: '#ffffff',
      theme: 'dark',
      transitionIn: 'fadeIn'
    })
  }

  successModal(msg: string, callback?: Function) {
    const initialState = {
      title: 'Success',
      text: msg,
    }
    const modalRef = this.modalService.show(NotificationModalComponent, {
      initialState,
      class: 'modal-center modal-success',
      backdrop: 'static'
    })
    modalRef.content.closed$.subscribe(() => {
      callback()
    })
  }

  errorModal(msg: string, callback?: Function) {
    const initialState = {
      title: 'error',
      text: msg,
      type: 'error'
    }
    const modalRef = this.modalService.show(NotificationModalComponent, {
      initialState,
      class: 'modal-center modal-error',
      backdrop: 'static'
    })
    modalRef.content.closed$.subscribe(() => {
      callback()
    })
  }
}
