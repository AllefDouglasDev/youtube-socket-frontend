import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogoutService } from './../shared/services/logout.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit 
{
  /** Nome do botão da NavBar */
  btnNavBar: string = "logout";
  /** Se deve mostrar o form de editar */
  edit: boolean;
  /** Id da sala a ser editada */
  roomId: number;

  constructor(
    private _router: Router,
    private _logoutService: LogoutService
  ) { }

  ngOnInit() {  }

  onLogout() 
  {
    this._router.navigate(['/home']);
    this._logoutService.logout();
  }

  editClicked() 
  {
    this.edit = true;
  }

}
