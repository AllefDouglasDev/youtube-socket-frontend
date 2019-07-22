import { Injectable } from '@angular/core';

import { AuthGuard } from './../guards/auth.guard';

@Injectable()
export class LogoutService 
{
  constructor(
    private _authGuard: AuthGuard
  ) { }

  logout() 
  {
    localStorage.clear(); 
    this._authGuard.isLoggedIn = false;
  }

}
