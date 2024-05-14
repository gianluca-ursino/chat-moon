import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})

export class ChatFormComponent implements OnInit {
  message: string;

  @Input() loggedUser: string;
  // emailReceiver: string = 'francesco.zucaro@consulenti.csi.it';

  constructor(private chatService: ChatService) {}

  ngOnInit() {}

  sendMessage(emailReceiver: string): void {
    if (this.message) {
      this.chatService.sendMessage(this.message, emailReceiver);
      this.message = null;
    }
  }

  handleSubmit(event): void {
    if (event.keyCode === 13) {
      this.sendMessage(this.loggedUser);
    }
  }
}
