import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { Unsubscriber } from 'untils/unsubscriber'

@Unsubscriber()
@Component({
  selector: 'notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  @Input() title: string
  @Input() text: string
  @Input() closed$ = new EventEmitter()
  @Input() type: 'error' | 'success' | 'danger' | 'customIcon' = 'success'
  @Input() btnPrimary = 'Continue'
  @Input() image: string
  constructor(
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.modalRef.hide()
    this.closed$.emit()
  }
}
