import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service'
import { User } from 'src/app/modals/user.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = new User()
  hide = true;

  constructor(private usersService: UsersService,private router:Router) { }

  ngOnInit() {
    console.log("home")
  }

  logIn(): void {

    this.usersService.login(this.user).subscribe(res=>{
      console.log(res)
      if(!res){
       this.router.navigate(['/register']);
      }else{
        alert("s");
        
        localStorage.setItem("userDetails", JSON.stringify( res));
       
      
        
        this.router.navigate(['/classroom']);
      }
    },err=>{
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });

  }

  register(): void {
    alert("register");
  }
}
