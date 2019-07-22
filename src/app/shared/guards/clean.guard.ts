import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LogoutService } from '../services/logout.service';

@Injectable()
/** Guarda de rota de autenticação */
export class CleanGuard implements CanActivate
{
    constructor(
        private _logoutService: LogoutService
    ) { }

    /** Verifica se o usuário está autenticado
     *  Redireciona para o login caso não esteja
     *  @return true se autenticado, false caso não esteja
     */
    canActivate( 
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ) :Observable<boolean> | Promise<boolean> | boolean
    { 
        this._logoutService.logout();
        return true;
    }
}
