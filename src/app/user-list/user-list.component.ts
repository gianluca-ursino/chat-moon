import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Output() openChatEmitter: EventEmitter<string> = new EventEmitter();
  @Output() usersList: EventEmitter<any[]> = new EventEmitter();


  constructor() { }

  users =
    [
      {
        name: "Francesco Zucaro",
        email: "francesco.zucaro@consulenti.csi.it",
        username: "francesco.zucaro"
      },
      {
        name: "Alberto Deiro",
        email: "alberto.deiro@csi.it",
        username: "alberto.deiro"
      },
      {
        name: "Gianluca Ursino",
        email: "gianluca.ursino@consulenti.csi.it",
        username: "gianluca.ursino"
      }
    ]

  ngOnInit() {
    this.usersList.emit(this.users);
    this.users = this.users.filter(a => a.email !== environment.currentUser);
    // console.log(this.users);
  }

  openChat(email: string) {
    this.openChatEmitter.emit(email);
  }
}
