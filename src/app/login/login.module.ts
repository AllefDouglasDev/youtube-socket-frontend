import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SharedModule } from './../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
      LoginComponent,
      SingUpComponent,
      SingInComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    MDBBootstrapModule.forRoot(),
    CheckboxModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: []
})
export class LoginModule { }