import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LogoutService } from './../../shared/services/logout.service';
import { AuthService } from './../../shared/services/auth.service';
import { MessageService } from './../../shared/services/message.service';
import { RoomService } from './../../shared/services/room.service';
import { YtService } from '../../shared/services/yt.service';

@Component({
  selector: 'app-youtube-room',
  templateUrl: './youtube-room.component.html',
  styleUrls: ['./youtube-room.component.scss']
})
export class YoutubeRoomComponent implements OnInit 
{
  /** Nome do botão da NavBar */
  btnNavBar: string = "login";
  /** Informa se o usuário está logado */
  isLogged: boolean = false;
  /** Informa o erro ao tentar submeter o formulário */
  error: string = '';
  /** Mostrar ou não mensagem de erro */
  hasError: boolean;
  /** Display da senha */
  display: boolean;
  /** Se o usuário está autorizado a entrar na sala */
  authorizated: boolean;
  /** Senha para a sala */
  roomPass: string;
  /** Link da sala */
  roomLink: string;
  /** Nome da sala */
  roomName: string;
  /** Dados da busca de vídeos */
  sVideos: string;
  /** Nome do vídeo a ser alterado ou atual */
  videoLabel: string;
  /** Resultados da pesquisa do yourube */
  ytVideosResult = [];
  /** Altura e largura do scroll */
  sizeScroll;
  /** Id do vídeo atual */
  videoId: string = "UceaB4D0jpo";
  /** Se o usuário é o dono sa sala */
  isOwnner: boolean = false;

  constructor(
    private _messageService: MessageService,
    private _roomService: RoomService,
    private _authService: AuthService,
    private _router: Router,
    private _ytService: YtService,
    private _logoutService: LogoutService
  ) { }

  ngOnInit() 
  {
    this._authService.verifyToken()
    .subscribe(res => {
      this.btnNavBar = "logout";
      this.isLogged = true;
      this.joinRoom()
    }, err => {
      this.joinRoom()
    });
  }

  /** Redireciona o usuário para a tela de login */
  onLoginLogout() 
  { 
    if (this.isLogged) {
      this._router.navigate(['/home']);
      this._logoutService.logout();
    } else {
      this._router.navigate(['/login']);
    }
  }

  /** Junta a sala */
  joinRoom() 
  {
    let userName = atob(localStorage.getItem("data"));
    if (null != localStorage.getItem("data")) {
      this.roomLink = this._router.url.substr(6, this._router.url.length);
      this._roomService.showRoomByLink(this.roomLink).then(res => {

        if (res.json().room.videoId != "") this.videoId = res.json().room.videoId;
        this.roomName = res.json().room.name;

        if (res.json().room.level == "private") { // Se a sala for privada
          let token =  localStorage.getItem("token");
          if (null != token) {
            // Verifica se o usuário que entrou é o dono da sala
            this._roomService.userOwnner(this.roomLink)
            .subscribe((res) => {
              if (res.status == "user_not_ownner") {
                this.showDisplay();
              } else {
                this.authorizated = true;
                this.isOwnner = true;
              }
            });
          } else {
            this.showDisplay();
          }
        } else { // Se a sala for pública
          this.authorizated = true;
          this.sendMensageToJoin();
        }
      });
    } else {
      this.showError("Erro ao entrar. Nome do usuário não existe.");
    }
  }

  /** Verifica se a senha está correta e junta a sela caso esteja */
  verifyPass() 
  {
    if (this.roomPass != "") {
      let room = { link: this.roomLink, password: this.roomPass };
      this._roomService.verifyPass(room) 
      .then(res => {
        this.authorizated = true;
        this.showDisplay();
        this.sendMensageToJoin();
      })
      .catch(err => this.showError("Senha incorreta!"));
    } else {
      this.showError("Senha incorreta!")
    }
  }

  /** Manda mensagem para o socket para se juntar a sala */
  sendMensageToJoin() 
  {
    let userName = atob(localStorage.getItem("data"));
    let room = { event: 'join-room', isLogged: this.isLogged, userName: userName, roomLink: this.roomLink };
    // manda mensagem para o socket
    this._messageService.sendMessage(room);
    if (this.videoId != undefined) this._roomService.setVideId(this.videoId);
  }

  /** Mostra o dialog para solicitar senha */
  showDisplay() 
  {
    this.display = !this.display;
  }

  /** Mostra ou esconde o label de erro */
  showError(err) 
  {
    this.error = err;
    this.hasError = !this.hasError;
    setTimeout(() =>  this.hasError = !this.hasError, 2000);
  }

  /** Procura vídeos na api do youtube */
  searchVideos() 
  {
    this._ytService.search(this.sVideos)
    .then(res => {
      this.ytVideosResult = res.items;
      this.sizeScroll = {width: '100%', height: '400px' };
    });
  }

  /** Altera o vídeoId e título para mudar */
  changeVideo(videoId, title) 
  {
    if (videoId) {
      this.videoLabel = title;
      this.videoId = videoId;
      this._roomService.setVideId(videoId);
    }
  }
}
