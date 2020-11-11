import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { classes } from '../modals/classes.modal';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
  })

  export class classService {
    basicUrl=environment.apiEndpoint + "/classes/"
     classes :classes[]=[] ;
    constructor(public http:HttpClient) { }
  
    get(){
      return this.http.get<classes[]>(this.basicUrl+"all")
    }
    GetclassesByTeacherId(teacherId){
      return this.http.get<classes[]>(this.basicUrl+teacherId)
    }
    getClassLesson(idClassLesson){
      return this.http.get(`${this.basicUrl}getClassLesson/${idClassLesson}`);
    }
    
    getClassLessonByIds(classId,lessonId){
      return this.http.get(`${this.basicUrl}getClassLesson/${classId}/${lessonId}`);
    }
  }
 