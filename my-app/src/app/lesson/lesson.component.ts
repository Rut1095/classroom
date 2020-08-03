import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modals/user.modal';
import { UsersService } from '../services/users.service';

@Component({
  
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  
  @Input() id:String;

  

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
     private router : Router
     ) { }

     
  activeUsers:Array<User>;//

  ngOnInit(): void {
		this.route.paramMap.subscribe(p => this.getLessons(p.has('id') && p.get('id')));
    this.getAllActiveUsersInLesson();
  }

  getLessons(_id:String):void{
    this.id = _id;
  }

  //set i am active
  setUserActiveInLesson():void{

  }

  //set all athoer users that active
  getAllActiveUsersInLesson():void{

    this.usersService.getAll().subscribe(res=>{
        this.activeUsers = res;
  
        console.log(res);
    },err=>{
        console.log(err)
        alert("שגיאה בקריאה לשירות");
    });
  }

}
