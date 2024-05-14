import { Injectable } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class ChatService {
  chatMessage: ChatMessage;
  chatMessages!: AngularFireList<any>;

  currentUser: string = environment.currentUser;

  constructor(
    private afdb: AngularFireDatabase,
  ) {}

  sendMessage(message: string, emailReceiver: string): void {
    // console.log(emailReceiver)
    const timestamp = this.getTimestamp();
    const username = environment.currentUser.split('@')[0];
    const emailSender = environment.currentUser;

    this.chatMessages = this.getMessages();

    this.chatMessages.push({
      message,
      username,
      emailReceiver,
      emailSender,
      timestamp,
    });
  }

  getMessages(): AngularFireList<any> {
    return this.afdb.list('messages');
  }

  getOwn() {
    const obs1: Observable<any> = this.getOwnMessages()
    return obs1
  }

  getHis() {
    const obs2: Observable<any> = this.getHisMessages()
    return obs2
  }

  getOwnMessages() {
    return this.afdb.list('messages', ref => ref.orderByChild('emailSender').equalTo(this.currentUser)).valueChanges();
  }

  getHisMessages() {
    return this.afdb.list('messages', ref => ref.orderByChild('emailReceiver').equalTo(this.currentUser)).valueChanges();
  }

  private getTimestamp() {
    const now = new Date();
    const date = `${now.getUTCFullYear()}/${now.getUTCMonth() + 1}/${now.getUTCDate()}`;
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    return `${date} ${time}`;
  }
}
