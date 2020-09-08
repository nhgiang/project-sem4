import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from './pagination/pagination.component'
import { NoResultsComponent } from './no-results/no-results.component'
import { SearchInputComponent } from './search-input/search-input.component'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ConfirmationComponent } from "./confirmation/confirmationComponent"
import { SimpleBarDirective } from './simple-bar.directive'
import { ListContainer } from './list-container'
import { NotificationModalComponent } from './notification-modal/notification-modal.component'
import { ModalModule } from 'ngx-bootstrap/modal'
import { RatingStarComponent } from './rating-star/rating-star.component'

const core = [
  PaginationComponent,
  NoResultsComponent,
  SearchInputComponent,
  ConfirmationComponent,
  SimpleBarDirective,
  NotificationModalComponent,
  RatingStarComponent
]

@NgModule({
  declarations: [
    core
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule
  ],
  exports: [
    core
  ]
})
export class CoreModule { }
