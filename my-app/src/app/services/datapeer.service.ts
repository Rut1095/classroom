import { Injectable ,EventEmitter} from '@angular/core';
import { ActiveUser } from '../modals/ActiveUser';
import {Subscription} from 'rxjs';
import { classLessons } from '../modals/classLessons.modal';

@Injectable({
  providedIn: 'root'
})
export class DatapeerService {

  invokeLessonCompnentInitPeer = new EventEmitter();

  
  invokeCameraRereshUsers = new EventEmitter();
  
  invokeRemoveUactiveUser = new EventEmitter();

  userToRemove:ActiveUser;

  subsVarEventEmitter:Subscription;
  subsVarCameraEventEmitter:Subscription;
  private peer;
  activeUsers: Array<ActiveUser>;
  classLessonActive:classLessons;
  constructor() { }

  setPeer(val){
    this.peer = val;
    this.onLessonListInitPeer();
  }

  getPeer(){
    return this.peer;
  }
setClassLessonActive(c){
  this.classLessonActive=c;
}
  onLessonListInitPeer(){
    this.invokeLessonCompnentInitPeer.emit();
   }

   OnLessonRefreshUsers(){
     this.invokeCameraRereshUsers.emit();
   }

   OnRemoveActiveUser(userToRemove:ActiveUser){
     this.userToRemove = userToRemove;
     this.invokeRemoveUactiveUser.emit();
   }
  
  setActiveUsers(val){
    this.activeUsers = val;
    this.OnLessonRefreshUsers();
  }
  
  getActiveUsers(){
    return this.activeUsers;
  }
}
