import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modals/user.modal';
import { UsersService } from '../services/users.service';
import { ActiveUser } from '../modals/ActiveUser';

@Component({

  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  @Input() id: String;
  user: User;
  sessionId: String;
  peer;
  peerid;
  user1: User;

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  activeUsers: Array<ActiveUser>;//

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => this.getLessons(p.has('id') && p.get('id')));

    //this.peer = new Peer(); //default - internet
    this.peer = new Peer('', {
      host: 'localhost',
      port: 9000,
      path: '/cameraServer'
    });


    setTimeout(() => {
      
      this.sessionId = this.peer.id;
      if(this.sessionId == null){
        this.sessionId="EMPTY";
      }
    }, 4000); // 4 seconds
    //  this.getAllActiveUsersInLesson();    
  }

  getLessons(_id: String): void {
    this.id = _id;
  }
  time;
  //set i am active
  setUserActiveInLesson(): void {
    this.user = JSON.parse(localStorage.getItem("userDetails"));

    this.usersService.setUserActive(this.user.ClassId, this.id, this.user.Id,this.sessionId).subscribe(res => {

      if (res) {
        localStorage.setItem("activeUser", JSON.stringify(res));
        alert(this.user.UserName + "נוכח בשיעור" + res.ClassLessonId);
        console.log(res)
        this.time = setInterval(()=>{
          let userA: ActiveUser = JSON.parse(localStorage.getItem("activeUser"));
          this.usersService.UpdateActiveUser(userA).subscribe(res => {
            this.activeUsers = res;
      
            console.log(res);
          }, err => {
            console.log(err)
            alert("שגיאה בקריאה לשירות");
          });
        },10000);
        // this.router.navigate(['/register'])
      } else {
        alert("אירעה שגיאה אין שיעור זמין");

      }
    }, err => {
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });
  }

  //set all athoer users that active
  getAllActiveUsersInLesson(): void {
    let userA: ActiveUser = JSON.parse(localStorage.getItem("activeUser"));
    this.usersService.UpdateActiveUser(userA).subscribe(res => {
      this.activeUsers = res;

      console.log(res);
    }, err => {
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });
  }
  //availble for teacher only to open new lesson
  //to send teacherId
  //update active lesson
  //check if teacher not exist lesson is not active
  startNewLesson()
  {
    alert("new lesson srarted now");
  }
}
