import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserTableRoomComponent } from './user-table-room/user-table-room.component';
import { UserEditRoomComponent } from './user-edit-room/user-edit-room.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    UserTableRoomComponent,
    UserEditRoomComponent
  ]
})
export class UserModule { }
