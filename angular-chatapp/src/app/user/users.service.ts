import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  
  // Subject stream (concretely BehaviorSubject)
  // the first value of this stream is null
  // Subject is a read/write stream and inherits from Observable and Observer
  // One consequence of streams is that, because messages are published immediately, a new subscriber risks missing the latest value of the stream
  // BehaviourSubject compensates for this
  // BehaviourSubject has a special property in that it stores the last value
  // Meaning that any subscriber to the stream will receive the latest value
  // This is great for us because it means that any part of our application can subscribe to the UsersService.currentUser stream 
  // and immediately know who the current user is
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  public setCurrentUser(newUser: User): void {
    // Note here that we use the next method on a Subject to push a new value to the stream
    this.currentUser.next(newUser);
  }

}

export const userServiceInjectables: Array<any> = [ UsersService ];