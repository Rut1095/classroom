import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

import { Document } from 'src/app/modals/document.modal';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  
  invokeAddLesson = new EventEmitter();
  subsVarEventEmitter:Subscription;
  
  doc:Document;

  basicUrl=environment.apiEndpoint + "/documents"
  constructor(public http:HttpClient) { }

  addDocument(req: DocumentRequest ){
    return this.http.post<Document>(this.basicUrl+"",req );
  }
  
  removeDocument(docId: Number ){
    return this.http.delete<Document>(this.basicUrl+"/" +docId );
  }

  OnAddDocument(thedoc:Document){
    this.doc=thedoc;
    this.invokeAddLesson.emit();
  }

  get(classId,LessonId){
    return this.http.get(this.basicUrl +"/"+classId+"/"+LessonId);
  }
  
}

export class DocumentRequest{
  userId:number;
  classId:Number;
  lessonId:Number;
  fileBase64:string;
  fileName:string;
}