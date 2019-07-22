import { CleanGuard } from './guards/clean.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LogoutService } from './services/logout.service';
import { YtService } from './services/yt.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AuthService } from './services/auth.service';
import { RoomService } from './services/room.service';
import { HomeComponent } from './../home/home.component';
import { SharedRoutingModule } from './shared-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { WebsocketService } from './services/websocket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [  
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    SharedRoutingModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NavBarComponent,
    SharedRoutingModule,
    HomeComponent,
    InputTextModule,
    ButtonModule,
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    WebsocketService,
    MessageService,
    UserService,
    RoomService,
    AuthService,
    AuthGuard,
    LogoutService,
    CleanGuard,
    YtService
  ]
})
export class SharedModule { }