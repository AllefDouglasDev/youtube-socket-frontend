import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { LogoutService } from './logout.service';

@Injectable()
export class AuthService 
{
  constructor(
    private _http: Http,
    private _httpClient: HttpClient
  ) { }

  /** Realiza login no sistema e retorna o token */
  login(user) 
  {
    return this._http.post(`${ environment.api_url }/auth/login`, user)
    .toPromise()
    .then(res => res);
  }

  /** Realiza logou no sistema */
  logout()
  {
    localStorage.clear(); 
  }

  /** Verifica se o token é valido 
   * O token é enviado via Header
  */
  verifyToken() 
  {
    return this._httpClient.get<any>(`${ environment.api_url }/auth/token`)
    .map(res => res);
  }
}
