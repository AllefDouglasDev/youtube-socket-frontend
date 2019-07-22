import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';

import { environment } from './../../../environments/environment';

@Injectable()
export class WebsocketService 
{
    /** Socket that connects to our socket.io server */
    private socket; 

    constructor( ) { }

    /** Conecta o socket do cliente com o back-end */
    connect(): Rx.Subject<MessageEvent> 
    {
        let me = this;
        this.socket = io(environment.ws_url);

        let observable = new Observable(observer => {
            /** Evento de play */
            this.socket.on('video', (data) => {
                observer.next(JSON.stringify(data));
            })

            return () => {
                this.socket.disconnect();
            }
        })

        let observer = {
            next: (data) => {
                this.socket.emit(data.event, JSON.stringify(data));
            }
        }

        return Rx.Subject.create(observer, observable);
    }    
}