import { Component, OnInit } from '@angular/core';
import { viewClassName } from '@angular/compiler';
import { LessonsService } from './../../services/lessons.service'
import { classService } from './../../services/classes.service';

import { Lesson } from 'src/app/modals/lesson.modal'
import { Router } from '@angular/router';
import { User } from 'src/app/modals/user.modal';
import { classes } from 'src/app/modals/classes.modal';
import { classLessons } from 'src/app/modals/classLessons.modal';

@Component({
  selector: 'app-teacher-lesson-list',
  templateUrl: './teacher-lesson-list.component.html',
  styleUrls: ['./teacher-lesson-list.component.css']
})

export class TeacherLessonListComponent implements OnInit {

  click1:boolean=false;


  constructor(private lessonsService: LessonsService,
    private classService: classService,
    private router: Router) { }

  lessons: Array<Lesson>;
  lessonList: Array<Lesson>;
  user: User;
  classesList: Array<classes>;
  classess : Array<classes>;
  classId : number;
  // Pressed: Number = 0;
  selectionClass: any;
  selectionLesson: any;
  lesson:classLessons= new classLessons();
  x:number;
className:string[]=['','כיתה א'];
  updateActiveUser() {

  }
  ngOnInit(): void {


    this.user = JSON.parse(localStorage.getItem("userDetails"));

    if (this.user == null) {
      this.router.navigate(['/register']);
      return;
    }

   

    // this.lessonsService.getLessonsByTeacherId(this.user.Id).subscribe(res => {
    //   console.log(res)
    //   this.lessons = res;
    // }, err => {
    //   console.log(err)
    //   alert("שגיאה בקריאה לשירות");
    // });
    

    this.classService.GetclassesByTeacherId(this.user.Id).subscribe(res => {
      console.log(this.user.Id)
      console.log(res)
      this.classess = res;
    }, err => {
      console.log(err)
      alert("2שגיאה בקריאה לשירות" );
    });

    this.lessonsService.get().subscribe(res => {
      console.log(res)
      this.lessonList = res;
    }, err => {
      console.log(err)
    });


    this.classService.get().subscribe(res => {
      // console.log(res)
      this.classesList = res;
      // console.log(this.classesList);
    }, err => {
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });


  }
  showAddLesson() {
    this.click1=true;

  }
  selectedLesson(event) {
    let target = event.source.selected._element.nativeElement;
    let selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    console.log(selectedData);
    this.lesson.lessonId=selectedData.value;
  }
  selectedClass(event) {
    let target = event.source.selected._element.nativeElement;
    let selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    console.log(selectedData);
    this.lesson.classId=selectedData.value;
  }
  addClassLesson(): void {
    this.lesson.teacherId=this.user.Id;
    this.lesson.lesseonIsActive=false;
    this.lessonsService.AddLessonClassTeacher(this.lesson).subscribe(
      res=>{
        console.log(res);
         if(res)
      alert("שיעור"+this.lesson.lessonId+" חדש נוסף לכיתה"+this.lesson.classId)
      }
     
    )
  }
  getLessonsByClass(classId){
     this.lessonsService.getLessonsByClass(classId).subscribe(res => {
    console.log(res)
    this.lessons = res;
  }, err => {
    console.log(err)
    alert("3שגיאה בקריאה לשירות");
  });
  }
 
}
