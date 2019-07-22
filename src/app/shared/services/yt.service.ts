import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class YtService {

  private _url: string = "https://www.googleapis.com/youtube/v3/search";
  constructor(
    private _http: Http
  ) { }

  search(values: string) 
  {
    let uri = `${ this._url }?part=snippet&maxResults=20&q=${ values }&key=AIzaSyC0u5n1NVZpN8RCTWhUEP2I0AeqUqqjZrQ`;
    return this._http.get(uri)
    .toPromise()
    .then(res => res.json());
  }
}
