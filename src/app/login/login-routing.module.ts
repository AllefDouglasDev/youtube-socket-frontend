import { NgModule } from "@angular/core/";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from "./sing-up/sing-up.component";
import { LoginComponent } from './login.component';
import { CleanGuard } from "../shared/guards/clean.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: 'singin', pathMatch: 'full'},
    //{ path: '', component: LoginComponent },
    { path: 'singup', component: SingUpComponent },
    { path: 'singin', component: SingInComponent, canActivate: [ CleanGuard ]},

    //{ path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(appRoutes) ],
    exports: [ RouterModule ]
})

export class LoginRoutingModule {}