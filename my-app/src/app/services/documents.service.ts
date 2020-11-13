import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  basicUrl=environment.apiEndpoint + "/documents"
  constructor(public http:HttpClient) { }

  addDocument(req: DocumentRequest ){
    return this.http.post<Document>(this.basicUrl+"",req );
  }

  get(){
    return this.http.get(this.basicUrl);
  }
  
}

export class DocumentRequest{
  userId:number;
  classId:number;
  lessonId:number;
  fileBase64:string;
  fileName:string;
}