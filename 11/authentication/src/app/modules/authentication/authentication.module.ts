import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationRoutingModule
  ],
  providers: [],
  bootstrap: [AuthenticationComponent]
})
export class AuthenticationModule { }
