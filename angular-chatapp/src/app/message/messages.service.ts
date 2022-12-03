import { Message } from './message.model';
import { Subject, Observable } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { scan, publishReplay, refCount, filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {

  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();
  // stream emits an Array of the most recent Messages
  messages: Observable<Message[]>;
  // updates receive operations that will be applied to our list of messages
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();

  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {

    // from updates to messages
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      }, initialMessages),
      // watch the updates and accumulate operations on the messages
      publishReplay(1),
      refCount()
    );

    // from create to updates
    this.create.pipe(
      // map to a IMessagesOperation function
      map(function(message: Message): IMessagesOperation {
        return (messages: Message[]): Message[] => {
          return messages.concat(message);
        }
      })
    ).subscribe(this.updates);

    // from newMessages to create
    this.newMessages.subscribe(this.create);

    this.markThreadAsRead.pipe(
      map((thread: Thread) => {
        return (messages: Message[]) => {
          // for each message, mark message is read if message thread id is equal to thread id
          return messages.map((message: Message) => {
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
    ).subscribe(this.updates);

  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  // for bot to setup the response message when receive their messages
  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => {
        return (message.thread.id === thread.id) && (message.author.id !== user.id);
      })
    );
  }

}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];

