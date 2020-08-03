import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { classes } from '../modals/classes.modal';


@Injectable({
    providedIn: 'root'
  })

  export class classService {
    basicUrl="https://localhost:44333/classes/"
     classes :classes[]=[] ;
    constructor(public http:HttpClient) { }
  
    get(){
      return this.http.get<classes[]>(this.basicUrl+"all")
    }
    
    
  }
 