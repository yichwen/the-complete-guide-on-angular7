import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { MessagesService } from '../message/messages.service';
import { ThreadsService } from '../thread/threads.service';
import { UsersService } from '../user/users.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {

  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService,
    public usersService: UsersService,
    public el: ElementRef
  ) { }

  ngOnInit() {
    this.messages = this.threadsService.currentThreadMessages;
    this.draftMessage = new Message();
    this.threadsService.currentThread.subscribe((thread: Thread) => {
      this.currentThread = thread;
    });
    this.usersService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });

    // Why do we have the setTimeout?
    // If we call scrollToBottom immediately when we get a new message then what happens is we scroll to the bottom before the new message is rendered
    // By using a setTimeout we’re telling JavaScript that we want to run this function when it is finished with the current execution queue
    // This happens after the component is rendered, so it does what we want
    this.messages.subscribe((messages: Array<Message>) => {
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
    });
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
