import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modals/user.modal';
import { UsersService } from 'src/app/services/users.service';
// import {lessonslist} from './../lessonslist/lessonslist.component';


@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css'],

})

export class ViewClassComponent implements OnInit {
//  user1:User=new User()

lessonId:number=1
  participates:User[]=[new User(),new User()]
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    // this.usersService.getUserInCurrentLesson(this.lessonId).subscribe(res=>{
    //   console.log(res)
    //   if(res){
    //     this.participates=res;
    //   }
    // },err=>{
    //   console.log(err)
    // }) 
  }
}
