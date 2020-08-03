import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modals/user.modal';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  basicUrl="https://localhost:44333/users/"

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
}
