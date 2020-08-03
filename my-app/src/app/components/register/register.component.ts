import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/modals/user.modal';
import { Lesson } from 'src/app/modals/lesson.modal';
import { classes } from 'src/app/modals/classes.modal';
import { FormControl, Validators } from '@angular/forms';
import { LessonsService } from 'src/app/services/lessons.service';
import { classService } from 'src/app/services/classes.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User()
  // calsses:classes=new classes()‏
  // classes: classes[]=[];
//    {Id: 11, Name: 'Dr Nice' },
//    { Id: 12, Name: 'Narco' },
//    { Id: 13, Name: 'Bombasto' }
//  
classesList:Array<classes> ;


 email = new FormControl('', [Validators.required, Validators.email]);
 selected ;
 hide = true;
  constructor(private usersService: UsersService,private classService:classService, private router:Router
    ) 
  {}
 
  ngOnInit(): void {
    this.classService.get().subscribe(res=>{
      console.log(res)
      this.classesList = res;
      console.log(this.classesList);
    },err=>{
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });
  }
 

  register():void{
    
    this.usersService.register(this.user).subscribe(res=>{
      console.log(res)
      if(!res){
        alert(res);
        // this.router.navigate(['/register'])
      }else{
        localStorage.setItem("userDetails", JSON.stringify( this.user));
        alert("נרשמת בהצלחה");
        this.router.navigate(['/classroom'])
      }
    },err=>{
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });
    //select all classes from classes
    
  }
getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'הכנס ערך';
      }  return this.email.hasError('email') ? 'כתובת לא חוקית' : '';
    }

}
