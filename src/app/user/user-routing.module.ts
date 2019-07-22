import { NgModule } from "@angular/core/";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UserComponent } from "./user.component";
import { UserEditRoomComponent } from "./user-edit-room/user-edit-room.component";
import { AuthGuard } from "../shared/guards/auth.guard";

const appRoutes: Routes = [
    { path: '', component: UserComponent, canActivate: [ AuthGuard ], canActivateChild: [ AuthGuard ],
        children: [
            { path: ':id/edit', component: UserEditRoomComponent },
        ] 
    },
];

@NgModule({
    imports: [ RouterModule.forChild(appRoutes) ],
    exports: [ RouterModule ]
})

export class UserRoutingModule {}