import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/modals/user.modal';
import { DatapeerService } from 'src/app/services/datapeer.service';
import { DocumentRequest, DocumentsService } from 'src/app/services/documents.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Document } from 'src/app/modals/document.modal';



@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit {

  fileName:string;
  ext:string;
  fileBase64:string;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

 
  constructor(private http:HttpClient, 
    private documentsService:DocumentsService,
     private datapeerService:DatapeerService,
     fb: FormBuilder) { 
      this.options = fb.group({
        hideRequired: this.hideRequiredControl,
        floatLabel: this.floatLabelControl,
      });
     }

  ngOnInit(): void {
  }

 
 onChange(files: FileList) {
  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      this.fileBase64 = String(reader.result);
      this.fileBase64 = this.fileBase64.split(',').pop();
     // console.log(this.fileBase64);
      this.fileName = files[0].name;
      this.ext = this.fileName.substring(this.fileName.lastIndexOf(".") );
      this.fileName = this.fileName.replace(this.ext,"");
    };
    reader.readAsDataURL(files[0]);
    
  }

}



 btnUpload(){
   if(this.fileBase64 == ""){
     alert("אנא בחר קובץ");
   }
   else if(this.fileName == ""){
     
    alert("אנא הזן שם קובץ");
   }else{
    var user:User = JSON.parse(localStorage.getItem("userDetails"));
     var documentToAdd:DocumentRequest = new DocumentRequest() ;
     documentToAdd.classId=this.datapeerService.classId;
     documentToAdd.lessonId=this.datapeerService.lessonId;
     documentToAdd.userId = user.Id;
     documentToAdd.fileBase64 = this.fileBase64;
     documentToAdd.fileName = this.fileName + this.ext;
    this.documentsService.addDocument(documentToAdd).subscribe((res:Document) =>{
      this.documentsService.OnAddDocument(res);
        console.log(res);
    });
    this.fileName = "";
   }
 
}
}