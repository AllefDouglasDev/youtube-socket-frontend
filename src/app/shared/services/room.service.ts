import { Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable()
export class RoomService 
{
  /** Sala que está sendo editada */
  public room = new Subject<any>();
  /** Vídeo que está sendo reptoduzido em uma sala específica */
  public videoId = new Subject<any>();

  constructor(
    private _http: Http,
    private _httpClient: HttpClient
  ) { }
  
  /** Muda a sala que foi editada */
  setRoom(value: any) {
    this.room.next(value); 
  }

  /** Muda o videoId de uma sala específica */
  setVideId(value: any) {
    this.videoId.next(value); 
  }

  /** Pega um link válido para a sala */
  getValidRoomLink() 
  {
    return this._http.get(`${ environment.api_url }/room/link/new`)
    .toPromise()
    .then(res => res);
  }

  /** Busca todas as salas não deleadas do usuário */
  show() 
  {
    return this._httpClient.get<any>(`${ environment.api_url }/room`)
    .map(res => res);
  }

  /** Busca uma sala pelo seu id*/
  showById(id) 
  {
    return this._httpClient.get<any>(`${ environment.api_url }/room/id/${ id }`)
    .map(res => res);
  }

  /** Retorna os dados de uma sala pelo link passado */
  showRoomByLink(link) 
  {
    return this._http.get(`${ environment.api_url }/room/link/${ link }`)
    .toPromise()
    .then(res => res);
  }

  /** Cria uma nova sala */
  createRoom(room) 
  {
    return this._http.post(`${ environment.api_url }/room`, room)
    .toPromise()
    .then(res => res);
  }

  /** Verifica se a senha da sala informada está correta */
  verifyPass(room) 
  {
    return this._http.post(`${ environment.api_url }/room/auth`, room)
    .toPromise()
    .then(res => res);
  }

  /** Verifica se o usuário é o dono da sala */
  userOwnner(link) 
  {
    return this._httpClient.get<any>(`${ environment.api_url }/room/ownner/${ link }`)
    .map(res => res);
  }

  /** Atualiza uma sala */
  update(id, room) 
  {
    return this._httpClient.put<any>(`${ environment.api_url }/room/${ id }`, room)
    .map(res => res);
  }

  /** Atualiza uma sala */
  updateVideoId(link, videoId) 
  {
    return this._httpClient.put<any>(`${ environment.api_url }/room/videoId/${ link }`, { videoId })
    .map(res => res);
  }

  /** Deleta uma sala */
  deleteRoom(id) 
  {
    return this._httpClient.delete<any>(`${ environment.api_url }/room/${ id }`)
    .map(res => res);
  }
}
