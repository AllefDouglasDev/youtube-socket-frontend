import { NgModule } from "@angular/core/";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { JoinRoomComponent } from './join-room/join-room.component';
import { CreateRoomComponent } from "./create-room/create-room.component";
import { RoomComponent } from './room.component';

const appRoutes: Routes = [
    { path: 'create', component: CreateRoomComponent },
    { path: 'join', component: JoinRoomComponent },
    { path: ':link', component: RoomComponent },
    { path: '', redirectTo: 'create', pathMatch: 'full'},
];

@NgModule({
    imports: [ RouterModule.forChild(appRoutes) ],
    exports: [ RouterModule ]
})

export class RoomRoutingModule {}