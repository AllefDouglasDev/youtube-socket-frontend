import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
//import { WSASERVICE_NOT_FOUND } from 'constants';

import { WebsocketService } from './websocket.service';

@Injectable()
export class MessageService 
{
  /** Mensagem a ser enviada para o NodeJS (socket) */
  public messages: Subject<any>;

  constructor(
    private websocketService: WebsocketService
  ) 
  {
    this.messages = <Subject<any>>websocketService
    .connect()
    .map(res => res);
  }

  /** 
   * Manda uma mensagem para socket.
   * Necessário enviar um objeto com o atributo { event: 'nome-do-evento'}
   */
  sendMessage(msg)
  {
    this.messages.next(msg);
  }
}
