import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private alert: AlertService) {

  }
  showModalNotify() {
    this.alert.successModal('Notification Modal', () => { })
  }

  showAlert() {
    this.alert.success('Bạn vừa cập nhật dữ liệu thành công')
  }
  showAlertError() {
    this.alert.error('Bạn vừa cập nhật dữ liệu thất bại')
  }
}
