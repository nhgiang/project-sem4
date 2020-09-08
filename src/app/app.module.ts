import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LaddaModule } from 'angular2-ladda'
import { SharedModule } from './shared/shared.module';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2IziToastModule,
    ModalModule.forRoot(),
    CoreModule,
    HttpClientModule,
    CommonModule,
    LaddaModule.forRoot({
      style: 'expand-left',
      spinnerSize: 20,
    }),
    SharedModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HeaderComponent]
})
export class AppModule { }
