import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

const sharedComponent = [
]

@NgModule({
  declarations: [sharedComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ],
  exports: [sharedComponent]
})
export class SharedModule { }
