import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
  ) { }

  Login = new BehaviorSubject(true);
  isLogin = this.Login.asObservable();

  setLoginEmmit(isLogin: boolean) {
    return this.Login.next(isLogin);
  }

}
