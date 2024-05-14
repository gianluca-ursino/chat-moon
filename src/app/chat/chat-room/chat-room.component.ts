import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { BehaviorSubject, timestamp } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller', {static: false}) private feedContainer: ElementRef;

  currentUser: string = environment.currentUser;
  emailReceiver: string;
  chatMessages: BehaviorSubject<any> = new BehaviorSubject([]);
  users: any[];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
  }

  getUsersList(users: any[]) {
    console.log(users);
    this.users = users;
  }
  
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  openChat(email: string) {
    this.emailReceiver = email;
    this.chatService.getOwn().subscribe((own: ChatMessage[]) => {
      this.chatService.getHis().subscribe((his: ChatMessage[]) => {
        const ownMessages = own.filter(o => o.emailReceiver === email);
        const hisMessages = his.filter(o => o.emailSender === email);
        
        let res: ChatMessage[] = [];
        res = res.concat(ownMessages);
        res =  res.concat(hisMessages);
        res = res.sort((b, a) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.chatMessages.next(res);
      })
    });
  }
}
