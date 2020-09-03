import { Component, OnInit } from '@angular/core';
import { viewClassName } from '@angular/compiler';
import { LessonsService } from './../../services/lessons.service'
import { Lesson } from 'src/app/modals/lesson.modal'
import { Router } from '@angular/router';
import { User } from 'src/app/modals/user.modal';

@Component({
  selector: 'app-lessonslist',
  templateUrl: './lessonslist.component.html',
  styleUrls: ['./lessonslist.component.css']
})

export class LessonslistComponent implements OnInit
 {

  constructor(private lessonsService: LessonsService,private router:Router)
   { }

  lessons:Array<Lesson> ;
  lessonList:Array<Lesson> ;
value:any;
  user: User;
  updateActiveUser()
  {
    
  }
  ngOnInit(): void 
  {

    
    this.user = JSON.parse( localStorage.getItem("userDetails"));

    if(this.user == null){
      this.router.navigate(['/register']);
      return;
    }

    this.lessonsService.getLessonsByClass(this.user.ClassId).subscribe(res=>{
      console.log(res)
      this.lessons = res;
    },err=>{
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });

    this.lessonsService.get().subscribe(res=>{
      console.log(res)
      this.lessonList = res;
    },err=>{
      console.log(err)
    });
    // this.lessonsService.get().subscribe(res=>{
    //   console.log(res)
    //   this.lessonList = res;
    //   console.log(this.lessonList);
    // },err=>{
    //   console.log(err)
    //   alert("שגיאה בקריאה לשירות");
    // });

  }

}
