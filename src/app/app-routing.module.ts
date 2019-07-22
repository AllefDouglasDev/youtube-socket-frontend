import { HomeComponent } from './home/home.component';
import { NgModule } from "@angular/core/";
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    //{ path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}