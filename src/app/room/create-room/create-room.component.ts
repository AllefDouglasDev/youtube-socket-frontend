import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../shared/services/auth.service';
import { MessageService } from './../../shared/services/message.service';
import { RoomService } from '../../shared/services/room.service';
import { LogoutService } from '../../shared/services/logout.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit 
{
  /** Referente ao formulário de cadastro */
  form: FormGroup;
  /** Nome do botão da NavBar */
  btnNavBar: string = "login";
  /** Informa se o usuário está logado */
  isLogged: boolean = false;
  /** Informa o erro ao tentar submeter o cadastro */
  error: string = '';
  /** Mostrar ou não mensagem de erro */
  hasError: boolean;
  /** Display com o link da sala */
  display: boolean;
  /** Link para a sala criada */
  link;
  @ViewChild("linkInput") linkInput;
  /** Tipo da sala (privada ou pública) */
  levelRoom: boolean;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _messageService: MessageService,
    private _roomService: RoomService,
    private _authService: AuthService,
    private _logoutService: LogoutService
  ) { }

  ngOnInit() 
  {
    this._authService.verifyToken()
    .subscribe(res => {
      this.btnNavBar = "logout";
      this.isLogged = true;
    }, err => err);

    this.form = this._fb.group({
      roomName: [ '', Validators.required ],
      userName: [ '' ],
      roomPass: [ '' ]
    });

    this._messageService.messages.subscribe(msg => {
      console.log(msg);
    });
  }

  /** Redireciona o usuário para a tela de login */
  onLoginLogout() 
  { 
    if (!this.isLogged) {
      this._router.navigate(['/login']);
    } else {
      this._logoutService.logout();
      this._router.navigate(['/home']);
    }
  }

  /** Copia o link da sala */
  copyLink() 
  {
    console.log(this.linkInput.nativeElement);
    this.linkInput.nativeElement.focus();
    this.linkInput.nativeElement.select();
    document.execCommand('copy');
  }
  /** Cria uma nova sala */
  onSubmit() 
  {
    let that = this;
    if (this.form.valid) {
      if (this.isLogged && this.levelRoom && this.form.get("roomPass").value == "") {
        this.showError("Por favor, preencha todos os campos.");
        return;
      } 

      if (!this.isLogged && this.form.get("userName").value == "") {
        this.showError("Por favor, preencha todos os campos.");
        return;
      } 

      this._roomService.getValidRoomLink().then(res => {
        this.link = res.json().roomLink;
        let roomName = this.form.get('roomName').value,
            userName = "",
            token = localStorage.getItem("token"),
            roomPass = "";

        if (!this.isLogged) {
          userName = this.form.get('userName').value;
          token = "";
        } 

        if (this.levelRoom) {
          roomPass = this.form.get('roomPass').value;
        }
        
        let room = { room: { 
                            isLogged: this.isLogged,
                            level: this.levelRoom ? "private" : "public",
                            roomName: roomName, 
                            roomPass: roomPass,
                            userName: userName, 
                            link: this.link,
                            token: token 
                      }
                  };
        this._roomService.createRoom(room)
        .then(res => {
          that._messageService.sendMessage({ event: 'create-room' });
          that.showError("Sala criada com sucesso.");

          localStorage.setItem("data",  btoa(userName));
          this.showDialog();
        })
        .catch(err => this.showError("Erro ao criar sala."));
      });
    } else {
      this.showError("Por favor, preencha todos os campos.");
    }
  }

  /** Mostra ou esconde o label de erro */
  showError(err) 
  {
    this.error = err;
    this.hasError = !this.hasError;
    setTimeout(() =>  this.hasError = !this.hasError, 2000);
  }

  /** Mostra dialog com link da sala */
  showDialog() {
    this.display = true;
  }

  /** Altera o tipo da sala */
  changeLevelRoom() 
  {
    this.levelRoom = !this.levelRoom;
  }
}
