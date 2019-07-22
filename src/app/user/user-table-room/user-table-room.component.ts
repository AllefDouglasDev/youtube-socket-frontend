import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { RoomService } from './../../shared/services/room.service';
import { Room } from '../../shared/models/room';

@Component({
  selector: 'app-user-table-room',
  templateUrl: './user-table-room.component.html',
  styleUrls: ['./user-table-room.component.scss']
})
export class UserTableRoomComponent implements OnInit 
{
  /** Salas criadas pelo usuário */
  rooms: Room[] = [];
  /** Ìnscrição das salas */
  roomSub;
  /** Id da sala que está sendo editada */
  editRoomId: number;

  constructor(
    private _roomService: RoomService,
    private _router: Router
  ) { }

  ngOnInit() 
  {  
    this.roomSub = this._roomService.show()
    .subscribe(
      res => {
        this.rooms = res.room;
      }, err => err
    );

    this._roomService.room
    .subscribe(record => {
      for(let i = 0, len = this.rooms.length; i < len; i++) {
        if (this.rooms[i]._id === record.room._id) this.rooms[i] = record.room;
      }
    });
  }

  /** Deleta uma sala */
  deleteRoom(id, position)
  {
    this._roomService.deleteRoom(id).subscribe(res => {
      if (id == this.editRoomId) this._router.navigate(['/user']);
      this.rooms.splice(position, 1);
    });
  }

  /** Altera o id da sala que está sendo editada */
  editRoom(id, position)
  {
    this.editRoomId = id;
    this._router.navigate(['/user', id, 'edit']);
  }

  ngOnDestroy() 
  {
    this.roomSub.unsubscribe;
  }
}
