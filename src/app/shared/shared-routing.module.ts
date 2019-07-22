import { NgModule } from "@angular/core/";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './../home/home.component';

const appRoutes: Routes = [
    { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
    { path: 'room', loadChildren: 'app/room/room.module#RoomModule' },
    { path: 'home', component: HomeComponent },
    //{ path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(appRoutes) ],
    exports: [ RouterModule ]
})

export class SharedRoutingModule {}