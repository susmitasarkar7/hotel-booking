import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
// import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    // private storage: StorageService
  ) { }

  loading = new BehaviorSubject(false);
  isLoading = this.loading.asObservable();

  Login = new BehaviorSubject(true);
  isLogin = this.Login.asObservable();

  user = new BehaviorSubject(false);
  userDetails = this.user.asObservable();

  isTemp = new BehaviorSubject(false);
  isTempData = this.isTemp.asObservable();



  // ALTERNATIVE
  async setTempEmmit(isTempData: any): Promise<any> {
    return await this.isTemp.next(isTempData);
  }

  setLoginEmmit(isLogin: boolean) {
    return this.Login.next(isLogin);
  }

  setLoaderEmmit(isLoading: boolean) {
    return this.loading.next(isLoading);
  }

}
