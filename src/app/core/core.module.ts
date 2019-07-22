import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { RoomModule } from '../room/room.module';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [],
  exports: []
})
export class CoreModule { }
