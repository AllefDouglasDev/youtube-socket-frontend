import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from './../../../environments/environment';

@Injectable()
export class UserService 
{
  constructor(
    private _http: Http
  ) { }

  createUser(user) 
  {
    return this._http.post(`${ environment.api_url }/user`, user).toPromise().then(res => res);
  }

}
