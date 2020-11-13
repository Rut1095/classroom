import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DocumentRequest, DocumentsService } from 'src/app/services/documents.service';


@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.css']
})
export class DocumentAddComponent implements OnInit {

  fileName:string;
  fileBase64:string;
  constructor(private http:HttpClient, private documentsService:DocumentsService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    let me = this;
    let file = files[0];
        
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    async function getfilebase64() {
      const result = await toBase64(file).catch(e => Error(e));
      if(result instanceof Error) {
         console.log('Error: ', result.message);
         return;
      }
      console.log(await toBase64(file));
    return await toBase64(file);
   }
   
 
  console.log (getfilebase64());
/*
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      console.log(reader.result);
      me.fileBase64=arrayBufferToBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };*/
 }

 
 onChange(files: FileList) {
  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      this.fileBase64 = String(reader.result);
      this.fileBase64 = this.fileBase64.split(',').pop();
      console.log(this.fileBase64);
      this.fileName = files[0].name;
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
     var documentToAdd:DocumentRequest = new DocumentRequest() ;
     documentToAdd.classId=1;
     documentToAdd.lessonId=1;
     documentToAdd.userId = 1;
     documentToAdd.fileBase64 = this.fileBase64;
     documentToAdd.fileName = this.fileName;
    this.documentsService.addDocument(documentToAdd).subscribe((res:Document) =>{
        console.log(res);
    });
   }
    /*
  if(this.fileData==null){
    alert("Please select file");
  }else{     
    var fileUplodVM: FileUplodVM={
      fileData:this.fileData.toString()
    }
    this.CreateItem(fileUplodVM).subscribe((res: any) =>{ 
      if(res){
        alert("Successfully uploded file");
      }else{
        alert("File upload failed");
      }
      
    },
    error => {
      alert(error.message);
    });
  }*/
}
public CreateItem(data) {
 return this.http.post(`http://localhost:52410/api/Order/UploadFile`, data)
  .pipe(map((res: any) => {
      console.log(res);
      return res;
    }));
}



}


export class FileUplodVM{
  fileData: string;
}