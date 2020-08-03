import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../modals/lesson.modal';


@Injectable({
    providedIn: 'root'
  })

  export class LessonsService {
    basicUrl="https://localhost:44333/lessons/"
  
    constructor(public http:HttpClient) { }
  
    get(){
      return this.http.get<Lesson[]>(this.basicUrl+"all")
    }
    
     getLessonsByClass(ClassId){
      return this.http.get<Lesson[]>(this.basicUrl+ClassId)
    }
  }
  