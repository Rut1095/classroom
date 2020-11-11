import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modals/user.modal';
import { ActiveUser } from '../modals/ActiveUser';
import { environment } from '../../environments/environment';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  basicUrl=environment.apiEndpoint + "/users/"

  constructor(public http:HttpClient) { }

  login(user){
    return this.http.post(this.basicUrl+"login",user)
  }
  register(user){
    return this.http.post(this.basicUrl+"register",user)
  }

  getAll(){
    return this.http.get<User[]>(this.basicUrl+"all")
  }
  setUserActiveWithCam(classId,LessonId,UserId,sessionId,showCam,showMic){
    return this.http.get<ActiveUser>(`${this.basicUrl}ActiveUser/${classId}/${LessonId}/${UserId}/${sessionId}/${showCam}/${showMic}`)

  }
  
  setUserActive(classId,LessonId,UserId,sessionId){
    return this.http.get<ActiveUser>(`${this.basicUrl}ActiveUser/${classId}/${LessonId}/${UserId}/${sessionId}`)
  }
  GetActivesUsers(user:ActiveUser){
    return this.http.post<ActiveUser[]>(this.basicUrl+"GetActivesUsers",user);
  }

  // deleteUnactiveUser(userId:User)
  // {
  //  return this.http.delete(this.basicUrl+"deleteUnactiveUser"+userId);
  // }


  SetLessonIsActive(id:String)
  {
   return this.http.post(this.basicUrl+"SetlessonIsActive",id);
  }

  setCameraState(userId:number, showCamera:boolean)
  {
   return this.http.get(`${this.basicUrl}${userId}/showCamera/${showCamera}`);
  }

  setMicrophoneState(userId:number, showMicrophone:boolean)
  {
    return this.http.get(`${this.basicUrl}${userId}/showMicrophone/${showMicrophone}` );
  }

}
