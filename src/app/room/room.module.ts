import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeComponent } from './youtube/youtube.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RoomRoutingModule } from './room-routing.module';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { DialogModule } from 'primeng/dialog';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { YoutubeRoomComponent } from './youtube-room/youtube-room.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RoomRoutingModule,
    MDBBootstrapModule.forRoot(),
    DialogModule,
    YoutubePlayerModule,
    OverlayPanelModule,
    ScrollPanelModule
  ],
  declarations: [
    CreateRoomComponent,
    RoomComponent,
    JoinRoomComponent,
    YoutubeComponent,
    YoutubeRoomComponent
  ]
})
export class RoomModule { }
