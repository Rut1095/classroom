import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUser } from 'src/app/modals/ActiveUser';
import { User } from 'src/app/modals/user.modal';
import { DatapeerService } from 'src/app/services/datapeer.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-camera',
  templateUrl: './user-camera.component.html',
  styleUrls: ['./user-camera.component.css']
})
export class UserCameraComponent implements OnInit {

  @ViewChild('myvideo', { read: ElementRef, static:true}) myvideo: ElementRef;  
  @Input() id: String;
  peer;
  peerid;
  user: User;
  sessionId: String;
  activeUsers: Array<ActiveUser>;
  time;

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private lessonsService: LessonsService,
    private datapeerService: DatapeerService
    ) { }

  ngOnInit(): void {

    alert("camera.ngOnInit");
    this.route.paramMap.subscribe(p => this.getLessons(p.has('id') && p.get('id')));
    
    this.user = JSON.parse(localStorage.getItem("userDetails"));
    
    this.peer = this.datapeerService.getPeer();// new Peer( localStorage.getItem("userPeerId")); //default - internet
    /*this.peer = new Peer('', {
      host: 'localhost',
      port: 9000,
      path: '/cameraServer'
    });*/

    //lessons list

    this.activeUsers =this.datapeerService.getActiveUsers();

    //setTimeout(() => {
      
      this.sessionId = this.peer.id;
      if(this.sessionId == null){
        this.sessionId="EMPTY";
      }
      alert(this.sessionId);


      
    // this.peer.on('connection', function(conn) {
    //   //console.log(conn);

    //   conn.on('data', function(data){
    //     // Will print 'hi!'
    //     //console.log(data);
    //     console.log('hi!');
    //     console.log(data);
    //     this.messagesStr += this.mymessage + "\n";
    //   });
    // });

    //wait for video call of another user and then answer the video call
    var getUserMedia = navigator.getUserMedia ;
    var myvideo = this.myvideo.nativeElement;

    this.peer.on('call', function(call) {
          getUserMedia({video: true, audio: true}, function(stream) {
              call.answer(stream); // Answer the call with an A/V stream.
              call.on('stream', function(remoteStream) {
                // Show stream in some video/canvas element.
                myvideo.srcObject = remoteStream;
                myvideo.play();

              });
          }, function(err) {
            console.log('Failed to get local stream' ,err);
          });
    });
    this.videoconnect();
   // }, 15 * 1000); // 4 seconds
    //  this.getAllActiveUsersInLesson();  
    

    

  }
  getLessons(_id: String): void {
    this.id = _id;
  }
videoconnect()
  videoconnect() : void{
    var getUserMedia = navigator.getUserMedia ;
    var localpeer = this.peer;
    var curruserid = this.user.Id;
    var video = this.myvideo.nativeElement;
    var myactiveusers = this.activeUsers;

    getUserMedia({video: true, audio: true}, function(stream) {

      myactiveusers.forEach(element => {
           if(curruserid != element.UserId) {
                var call = localpeer.call(element.sessionId, stream);
                call.on('stream', function(remoteStream) {

                  video.srcObject = remoteStream;
                  video.play();
                  // Show stream in some video/canvas element.
                });
           }
      });

       
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });

  }

  //availble for teacher only to open new lesson
  //to send teacherId
  //update active lesson
  //check if teacher not exist lesson is not active

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
  }


