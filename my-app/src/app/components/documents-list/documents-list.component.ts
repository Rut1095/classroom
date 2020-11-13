import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  data: Array<Document>;
  displayedColumns: string[] = ['FileName', 'UploadUserId', 'FilePath', 'CreationTime'];


  constructor(private documentsService:DocumentsService) { }

  ngOnInit(): void {
      this.documentsService.get().subscribe((res:Array<Document>) =>{
        
          this.data =res;
          debugger;
      });

  }

}
