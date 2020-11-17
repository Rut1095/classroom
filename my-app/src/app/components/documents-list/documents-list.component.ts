import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatapeerService } from 'src/app/services/datapeer.service';
import { DocumentsService } from 'src/app/services/documents.service';

import { Document } from 'src/app/modals/document.modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  data: Array<Document>;
  dataSource:MatTableDataSource<Document>;
  element:any = document.getElementById("yourDivID");

  displayedColumns: string[] = ['FileName', 'UploadUserName', 'FilePath', 'CreationTime' ,'delete'];


  constructor(private documentsService:DocumentsService,private datapeerService: DatapeerService) { }

  ngOnInit(): void {

      if(this.documentsService.subsVarEventEmitter == undefined){
        this.documentsService.subsVarEventEmitter = this.documentsService.invokeAddLesson.subscribe((name:string) =>{
          this.onAddDocument(this.documentsService.doc);
        });
      }

      this.documentsService.get(this.datapeerService.classId,this.datapeerService.lessonId).subscribe((res:Array<Document>) =>{
        
        res.forEach(element => {
          element.FilePath=environment.apiEndpoint + element.FilePath;
        });
        //https://10.0.0.5:44333

          this.data =res;
          this.dataSource = new MatTableDataSource<Document>(this.data);
          // debugger;
      });

  }

  onAddDocument(doc:Document){
    this.data.push(doc);
    this.dataSource = new MatTableDataSource<Document>(this.data);
    //this.data = this.data;
  }

  deleteFile(doc:Document):void{
   // debugger;
    this.documentsService.removeDocument(doc.Id).subscribe((res) =>{
        if(res){
          this.data.forEach( (item, index) => {
            if(item === doc) this.data.splice(index,1);
          });
          this.dataSource = new MatTableDataSource<Document>(this.data);
        }
        console.log(res);
    });
    
  }
  


}
