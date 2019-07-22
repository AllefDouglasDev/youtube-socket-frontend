import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from './../../shared/services/auth.service';
import { MessageService } from './../../shared/services/message.service';
import { RoomService } from './../../shared/services/room.service';
import { LogoutService } from '../../shared/services/logout.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit 
{
  /** Referente ao formulário */
  form: FormGroup;
  /** Nome do botão da NavBar */
  btnNavBar: string = "login";
  /** Informa se o usuário está logado */
  isLogged: boolean = false;
  /** Informa o erro ao tentar submeter o formulário */
  error: string = '';
  /** Mostrar ou não mensagem de erro */
  hasError: boolean;

  private _validUserName: Array<any>;

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
    this.form = this._fb.group({
      roomLink: [ '', Validators.required ],
      userName: [ '' ]
    });
    
    this._authService.verifyToken()
    .subscribe(res => {
      this.btnNavBar = "logout";
      this.isLogged = true;
    }, err => err);
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

  /** Cria uma nova sala */
  onSubmit() 
  {
    if (this.form.valid) {
      // Verifica se o usuário está logado
      if (!this.isLogged && this.form.get('userName').value == "") {
        this.showError("Por favor, preencha todos os campos.");
        return;
      }
      // Verifica se o link é válido
      let roomLink = this.form.get("roomLink").value;
      this._roomService.showRoomByLink(roomLink)
      .then(res => {
        if (!this.isLogged) {
          localStorage.setItem("data", btoa(this.form.get('userName').value));
        }

        let routerLink = "/room/" + this.form.get('roomLink').value;
        this._router.navigate([routerLink]);
      }).catch(error => {
        this.showError("Link da sala não disponível.");
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
}
