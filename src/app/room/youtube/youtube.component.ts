import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventListener } from 'angular-bootstrap-md/utils/facade/browser';

import { MessageService } from './../../shared/services/message.service';
import { RoomService } from '../../shared/services/room.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit 
{
  /** Player do youtube */
  player: YT.Player;
  /** Id do vídeo em reprodução */
  @Input() videoId: string;
  /** Se o Id do vídeo foi alterado */
  @Input() changedVideoId: boolean;
  /** Verifica se é a tela ta sendo iniciada */
  init: boolean;
  /** Link da sala */
  roomLink: string;

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _roomService: RoomService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() 
  {  
    this.route.params
    .subscribe((params) => {
        this.roomLink = params['link'];
      }
    );

    this._roomService.videoId.subscribe(videoId => {
      this.videoId = videoId;
      this.changeVideo();
    })

    this._messageService.messages
    .subscribe(res => {
      let p = JSON.parse(res);

      if (p.function == 'play') this.play();
      if (p.function == 'pause') this.pause();

      if (p.function == 'time') {
        this.player.seekTo(p.duration, true);
      }

      if (p.function == 'change') {
        this.videoId = p.videoId;
        this.player.loadVideoById({ videoId: p.videoId, startSeconds: 0, 'suggestedQuality': 'large' });
      }
    })
  }

  /** Instancia a variável de player como tipo player */
  savePlayer (player) 
  {
    this.player = player;
    this.play();
    setTimeout(() => {
      this.pause();
      this.init = true;
    }, 1000);
  }
  
  /** 
   * Quando o estado do vídeo é alterado, 
   * manda mensagens para executar função de
   * Pausar vídeo
   * Iniciar vídeo
   * Alterar tempo do vídeo
   */
  onStateChange(event)
  {
    /** Quando o vídeo é pausado */
    if(event.data == 1 ) {
      this._messageService.sendMessage({ event: "play", room: this.roomLink })
    } 

    /** Quando o vídeo é pausado */
    if(event.data == 2 ) {
      this._messageService.sendMessage({ event: "pause", room: this.roomLink })
    } 
    
    /** Quando a barra do vídeo é clicada */
    if(event.data === 3 && this.init) {
      this._messageService.sendMessage({ event: "time", room: this.roomLink, duration: this.player.getCurrentTime() })
    }
  }

  /** Pausa o vídeo */
  pause() 
  {
    this.player.pauseVideo();
  }

  /** Inicia o vídeo */
  play() 
  {
    this.player.playVideo();
  }

  /** Reinicia o vídeo */
  restart() 
  {
    this.player.seekTo(0, true);
    this._messageService.sendMessage({ event: "time", room: this.roomLink, duration: 0 })
  }

  /** Retorna o id do vídeo */
  getVideoId() 
  {
    return this.videoId;
  }

  /** Altera o vídeo que está sendo reproduzido */
  changeVideo() 
  {
    this.player.loadVideoById({ videoId: this.videoId, startSeconds: 0, 'suggestedQuality': 'large' });
    this._messageService.sendMessage({ event: "change", room: this.roomLink, videoId: this.videoId });
    this._roomService.updateVideoId(this.roomLink, this.videoId).subscribe();
  }
}
