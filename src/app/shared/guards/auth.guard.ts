import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Injectable()
/** Guarda de rota de autenticação */
export class AuthGuard implements CanActivate, CanActivateChild
{
    public isLoggedIn: boolean = false;

    public redirectUrl: string;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    /** Verifica se o usuário está autenticado
     *  Redireciona para o login caso não esteja
     *  @return true se autenticado, false caso não esteja
     */
    canActivate( 
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ) :Observable<boolean> | Promise<boolean> | boolean
    { 
        this.redirectUrl = state.url;
        return this.checkLogin(this.redirectUrl);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        this.redirectUrl = state.url;
        return this.checkLogin(this.redirectUrl);
    }

    /** Verifica se o usuário está logado */
    checkLogin(url: string): boolean 
    {
        if (this.isLoggedIn) {
            return true;
        } else {
            this._authService.verifyToken()
            .subscribe(
                res => {
                    this.isLoggedIn = true;
                    this._router.navigateByUrl(url);
                },
                error => {
                    this.isLoggedIn = false;
                    //this._authService.redirectUrl = url;
                    this._router.navigateByUrl('/login');
                }
            );
        }
    }
}
