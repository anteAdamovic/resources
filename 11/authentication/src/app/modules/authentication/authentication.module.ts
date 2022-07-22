import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { ForgotPasswordComponent, LoginComponent, RegisterComponent } from './components';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationRoutingModule
  ],
  providers: [],
  bootstrap: [AuthenticationComponent]
})
export class AuthenticationModule { }
