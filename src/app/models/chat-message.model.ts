export class ChatMessage {
  $key?: string;
  emailSender?: string;
  message?: string;
  username?: string;
  emailReceiver: string;
  timestamp?: Date = new Date();
}
