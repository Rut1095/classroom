import { Injectable } from '@angular/core';
import { ActiveUser } from '../modals/ActiveUser';

@Injectable({
  providedIn: 'root'
})
export class DatapeerService {

  private peer;
  activeUsers: Array<ActiveUser>;

  constructor() { }

  setPeer(val){
    this.peer = val;
  }

  getPeer(){
    return this.peer;
  }

  
  setActiveUsers(val){
    this.activeUsers = val;
  }
  
  getActiveUsers(){
    return this.activeUsers;
  }
}
