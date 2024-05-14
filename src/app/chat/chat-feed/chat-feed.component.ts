import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})

export class ChatFeedComponent implements OnInit {
  
  @Input() loggedUser: string;
  @Input()  chatMessages;
  
  chatFeed: any;
  currentUser: string = environment.currentUser;

  constructor() {}

  ngOnInit() {

  }
}
