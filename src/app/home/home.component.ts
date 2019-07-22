import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { LogoutService } from '../shared/services/logout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit 
{
  /** Botão de login ou logout */
  btnNavBar: string = "LOGIN";
  /** Se o usuário está logado */
  isLogged: boolean;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _logoutService: LogoutService
  ) { }

  ngOnInit() 
  {
    this._authService.verifyToken()
    .subscribe(res => {
      this.btnNavBar = "LOGOUT";
      this.isLogged = true;
    }, err => err);
  }

  /** Redireciona o usuário para a tela de login */
  onLoginLogout() 
  { 
    if (!this.isLogged) {
      this._router.navigate(['/login']);
    } else {
      this._logoutService.logout();
      this._router.navigate(['/login']);
    }
  }

}
