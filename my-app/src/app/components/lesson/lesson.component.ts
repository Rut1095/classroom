import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { User } from './../../modals/user.modal';
import { ActiveUser } from './../../modals/ActiveUser';
import { Lesson } from './../../modals/lesson.modal';
import { classes } from './../../modals/classes.modal';

import { UsersService } from './../../services/users.service';
import { LessonsService } from './../../services/lessons.service'
import { classService }  from './../../services/classes.service';
import { from } from 'rxjs';
import { classLessons } from 'src/app/modals/classLessons.modal';
import { DatapeerService } from 'src/app/services/datapeer.service';


@Component({

  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit ,OnChanges {

  //@ViewChild('myvideo', { read: ElementRef, static:true}) myvideo: ElementRef;  
  @Input() id: String;
  @Input() classId: String;
  user: User;
  sessionId: String;
  peer;
  peerid;
  user1: User;
  lessonList:Array<Lesson> ;
  classesList:Array<classes> ;
  activeUsers: Array<ActiveUser>;
  time;
  clsLes:classLessons;
  isOn:boolean  =false;
  lessIsActive:boolean=false;
  chatClick:boolean=false;
  currentLesson:string;
  peerIsActive:boolean  =false;

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private lessonsService: LessonsService
    ,private classService:classService,
    private datapeerService: DatapeerService
  ) { }
 
  ngOnInit(): void
   {
    
     
    this.user = JSON.parse(localStorage.getItem("userDetails"));
//alert( localStorage.getItem("userPeerId"));
    if(this.datapeerService.getPeer() == undefined){
      //activate event that wait for camere
      if(this.datapeerService.subsVarEventEmitter == undefined){
        this.datapeerService.subsVarEventEmitter = this.datapeerService.invokeLessonCompnentInitPeer.subscribe((name:string) =>{
          this.OnInitPeer();
        });
      }
    }else{
      this.OnInitPeer();
    }
 

    this.route.paramMap.subscribe(p => this.getLessons(p.has('id') && p.get('id'),p.has('classId') && p.get('classId') ));
 
    //this.peer = this.datapeerService.getPeer();//new Peer( localStorage.getItem("userPeerId")); //default - internet
    
    /*this.peer = new Peer('', {
      host: 'localhost',
      port: 9000,
      path: '/cameraServer'
    });*/

    //lessons list

   //classes list

    this.classService.get().subscribe(res=>{
      console.log(res)
      this.classesList = res;
      console.log(this.classesList);
    },err=>{
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });

    
    //setTimeout(() => {
    //}, 15 * 1000); // 4 seconds
    //  this.getAllActiveUsersInLesson();  
    

    

  }

  getLessons(_id: String, _classId: String): void {
    this.id = _id;

    if(this.lessonList==undefined){
      
        this.lessonsService.get().subscribe(res=>{
          console.log(res)
          this.lessonList = res;
          this.getLessonName(_id);

    
        this.classService.getClassLessonByIds(_classId, _id).subscribe((res:classLessons)=>{
          console.log("theclassId:");
          console.log(res);
          this.datapeerService.setClassLessonActive(res);
        });

        },err=>{
          console.log(err)
        });

    }else{
      this.getLessonName(_id);
    }

  }

  
  //wait the peer to init id
  OnInitPeer():void{
    
      this.peer = this.datapeerService.getPeer();
          
      this.sessionId = this.peer.id;

      if(this.sessionId == null){
        this.sessionId="EMPTY";
      }else this.peerIsActive = true;
      
      //alert(this.sessionId);



  
  }

  getLessonName(_id:String){
    
    var currentLesId= parseInt(_id.toString(),10);
    this.lessonList.forEach(element => {
      if(currentLesId == element.Id)
        this.currentLesson=element.Name;
      
    });
  }

 
  //set i am active
  setUserActiveInLesson(): void {
    this.lessIsActive = true;

    if(this.peer == undefined){
      alert("בעייה בטעינת מצלמה - נסה להמתין או לטעון את הדף מחדש");
      this.lessIsActive = false;

      return;
    }

    this.user = JSON.parse(localStorage.getItem("userDetails"));

   // alert("setuserActive sessionId: " + this.sessionId);
    
   // alert("setuserActive sessionId: " + this.peer.id);
    var classId:Number;
  
    this.usersService.setUserActiveWithCam(this.datapeerService.classLessonActive.classId, this.id, this.user.Id,this.sessionId,true,true).subscribe(res => {

      if (res) {
        localStorage.setItem("activeUser", JSON.stringify(res));
        //alert(this.user.UserName + "נוכח בשיעור" + res.ClassLessonId); 
        console.log(this.user.UserName + "נוכח בשיעור" + res.ClassLessonId);
        this.classService.getClassLesson(res.ClassLessonId).subscribe((res:classLessons)=>{
          this.clsLes=res;
          this.datapeerService.setClassLessonActive(res);
        });
        this.lessIsActive = true;

        console.log(res)
        this.getActiveUsersAll10Seconds();
        // this.router.navigate(['/register'])
      } else {
        alert("אירעה שגיאה אין שיעור זמין");

      }
    }, err => {
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });
    
  }

  getActiveUsersAll10Seconds():void{
    //do first
    this.getActiveUsersAll();
    //run all 10 seconds
    this.time = setInterval(()=>{
      if(!this.isOn) return;
      this.getActiveUsersAll();
    },10 * 1000);
  }

  syncActiveUsers(newActUsers: Array<ActiveUser>):void{
   
    //put all active false in old actives
    this.activeUsers.forEach(au => {
      au.active = false;
    });

    //check update and add users
    newActUsers.forEach(newau => {
      var isuserfound:Boolean = false;
      this.activeUsers.forEach(oldau => {
        if(newau.UserId == oldau.UserId ){
          if(newau.sessionId != oldau.sessionId ||
            oldau.showCamera != newau.showCamera ||
            oldau.showMicrophone != newau.showMicrophone ){
              oldau.sessionId = newau.sessionId;
              oldau.showCamera = newau.showCamera;
              oldau.showMicrophone = newau.showMicrophone;
              
          }
          oldau.active=true;
          isuserfound=true;
        }
      });

      if(!isuserfound){
        this.activeUsers.push(newau);
        
      }

    });

    //for on array after update user is active to check if need delete
    this.activeUsers.forEach((au,index) => {
      if(au.active == false){
        this.datapeerService.OnRemoveActiveUser(au);
        this.activeUsers.splice(index,1);
      }
    });

    
    this.datapeerService.setActiveUsers(this.activeUsers);
    
  }

  getActiveUsersAll():boolean{
        let userA: ActiveUser = JSON.parse(localStorage.getItem("activeUser"));
        this.usersService.GetActivesUsers(userA).subscribe(res => {
          if(this.activeUsers == undefined){
            
                console.log(res);
                this.activeUsers = res;
                
              this.datapeerService.setActiveUsers(this.activeUsers);
          }else
            this.syncActiveUsers(res)

              this.isOn = true;
            // this.videoconnect();
        }, err => {
          console.log(err)
          alert("שגיאה בקריאה לשירות");
          return false;
        });

        //update last time this user active
        this.usersService.setUserActive(this.user.ClassId, this.id, this.user.Id,this.sessionId).subscribe(res => {
        }, err => {
          console.log(err)
          alert("שגיאה בקריאה לשירות");
        });
        
        return true;
  }


  ngOnChanges(changes: SimpleChanges): void{
    console.log('change');
  }
  //set all athoer users that active
  /*
  getAllActiveUsersInLesson(): void {
    let userA: ActiveUser = JSON.parse(localStorage.getItem("activeUser"));
    this.usersService.UpdateActiveUser(userA).subscribe(res => {
      this.activeUsers = res;


      console.log(res);
    }, err => {
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });
  }*/
 connectpeervideo():void{
    alert("x0");
  }

  //availble for teacher only to open new lesson
  //to send teacherId
  //update active lesson
  //check if teacher not exist lesson is not active
  startNewLesson(id:String)
  {
    this.usersService.SetLessonIsActive(id).subscribe(res => {
      alert("new lesson srarted now");
      // this.jin=res;
    }, err => {
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    }); 
       this.setUserActiveInLesson();

    }



  }

  // sendMessage():void{
 // this.mymessage += "שלום";
    //this.messagesStr += this.mymessage + "\n";
    // this.messageArr.push({id:this.thisSend,name:"rut",message:this.newMsg});
    // this.newMsg="";
    //if(this.activeUsers == null) return;
  
    // this.activeUsers.forEach(element => {
    //   if(this.user.Id != element.UserId) {
  
    //     //alert(element.sessionId);
    //     var conn = this.peer.connect(element.sessionId);
    //     // on open will be launch when you successfully connect to PeerServer
    //     conn.on('open', function(){
    //         // here you have conn.id
    //         //console.log(this.mymessage);
    //         console.log(msg);
    //         conn.send('hi2!');
    //         conn.send(msg);
    //         alert(msg);
    //      });
    //   }
  //  });
  // }  
// }
