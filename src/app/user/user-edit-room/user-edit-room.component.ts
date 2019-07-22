import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RoomService } from './../../shared/services/room.service';

@Component({
  selector: 'app-user-edit-room',
  templateUrl: './user-edit-room.component.html',
  styleUrls: ['./user-edit-room.component.scss']
})
export class UserEditRoomComponent implements OnInit 
{
  /** Id da sala */
  roomId: number;
  /** Será desisncrito quando o componente for destruido */
  inscricao: Subscription;
  /** Referente ao formulário de cadastro */
  form: FormGroup;
  /** Level da sala */
  levelRoom: boolean;
  /** Se existe algum erro na edição */
  hasError: boolean;
  /** Informa o erro */
  error: string;

  constructor(
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _roomService: RoomService
  ) { }

  ngOnInit() 
  {
    this.inscricao = this.route.params
    .subscribe((params) => {
        this.roomId = params['id'];
        this.setInputValues();
      }
    );

    this.form = this._fb.group({
      roomName: [ '', Validators.required ],
      roomLink: [ '', Validators.required ],
      roomPass: [ '' ],
    }); 
  }

  onSubmit() 
  {
    if (this.form.valid) {
      if (this.levelRoom && !this.form.get("roomPass").value) return this.showError("Preencha todos os campos");

      let newRoom = { room: {
        _id: this.roomId,
        level: (this.levelRoom) ? "private" : "public",
        password: this.levelRoom ? this.form.get("roomPass").value : "",
        link: this.form.get("roomLink").value,
        deleted: 0,
        name: this.form.get("roomName").value,
      }};

      this._roomService.update(this.roomId, newRoom).subscribe(res => this._roomService.setRoom(newRoom));
    } else {
      this.showError("Preencha todos os campos");
    }
  }

  setInputValues() 
  {
    this._roomService.showById(this.roomId).subscribe(res => {
      this.levelRoom = (res.room[0].level === "private");

      this.form.get("roomName").setValue(res.room[0].name);
      this.form.get("roomLink").setValue(res.room[0].link);
      this.form.get("roomPass").setValue(res.room[0].password);
    });
  }

  changeLevelRoom() 
  {
    this.levelRoom = !this.levelRoom;
  }

  /** Mostra ou esconde o label de erro */
  showError(err) 
  {
    this.error = err;
    this.hasError = !this.hasError;
    setTimeout(() =>  this.hasError = !this.hasError, 2000);
  }

  ngOnDestroy() 
  {
    this.inscricao.unsubscribe();
  }
}
