import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActiveUser } from 'src/app/modals/ActiveUser';
import { classLessons } from 'src/app/modals/classLessons.modal';
import { User } from 'src/app/modals/user.modal';
import { DatapeerService } from 'src/app/services/datapeer.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { UsersService } from 'src/app/services/users.service';

export interface UserVideo {
  cameraStream: any;
  activeUser: ActiveUser;
}

@Component({
  selector: 'app-user-camera',
  templateUrl: './user-camera.component.html',
  styleUrls: ['./user-camera.component.css']
})
export class UserCameraComponent implements OnInit {
  
  //@ViewChild('myvideo', { read: ElementRef, static:true}) myvideo: ElementRef;  
  //@Input() id: String;
  peer;
  peerid;
  user: User;
  sessionId: String;
  activeUsers: Array<ActiveUser>;
  classLessonActive: classLessons = new classLessons();
  time;
  taecherActive: boolean = false;
  cameraStreamArray: Array<UserVideo>;
  ActiveUserScreen: UserVideo;
  camOn:boolean = true;
  vlmOn:boolean=true;
  ShareOn:boolean=false;
  userExitFromLesson:boolean=false;
  isLoader:boolean = false;
  myStream:any;

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private lessonsService: LessonsService,
    private datapeerService: DatapeerService
  ) { }

  ngOnInit(): void {
    this.isLoader=true;
    // alert("camera.ngOnInit");
    // this.route.paramMap.subscribe(p => this.getLessons(p.has('id') && p.get('id')));


    this.user = JSON.parse(localStorage.getItem("userDetails"));

    this.peer = this.datapeerService.getPeer();// new Peer( localStorage.getItem("userPeerId")); //default - internet
    this.classLessonActive = this.datapeerService.classLessonActive;
    console.log(this.classLessonActive);

    /*this.peer = new Peer('', {
      host: 'localhost',
      port: 9000,
      path: '/cameraServer'
    });*/

    //lessons list

    this.activeUsers = this.datapeerService.getActiveUsers();
    this.cameraStreamArray = new Array<UserVideo>();

    //setTimeout(() => {

    this.sessionId = this.peer.id;
    if (this.sessionId == null) {
      this.sessionId = "EMPTY";
    }
    // alert(this.sessionId);



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
    var getUserMedia = navigator.getUserMedia;


    //var myvideo = this.myvideo.nativeElement;

    let userA: ActiveUser = JSON.parse(localStorage.getItem("activeUser"));
    var thisObject = this;

    // on get request from user to answer - answer(connect)
    this.peer.on('call', function (call) {
      // debugger;
      var stream = thisObject.myStream;
      console.log('i got call' + call);
    //  getUserMedia({ video: true, audio: true }, function (stream) {
        
        console.log('i got call 2');
        //debugger;
        call.answer(stream); // Answer the call with an A/V stream.

        // thisObject.cameraStreamArray.push(stream);
        call.on('stream', function (remoteStream) {
          // Show stream in some video/canvas element.

            thisObject.usersService.GetActivesUsers(userA).subscribe(res => {
            
              console.log(res);
              au:ActiveUser;
              res.forEach(element => {
                if(element.sessionId == call.peer){
                  thisObject.pushActiveUser(thisObject,remoteStream,element);
                  //thisObject.cameraStreamArray.push({cameraStream:remoteStream, activeUser:element});
                }
              });
                
              // this.videoconnect();
          }, err => {
            console.log(err)
            alert("שגיאה בקריאה לשירות");
          });

        });
      // }, function (err) {
      //   console.log('Failed to get local stream', err);
      // });
    });

    
    //###########################
    // if(this.datapeerService.subsVarCameraEventEmitter == undefined){
    //   this.datapeerService.subsVarCameraEventEmitter = this.datapeerService.invokeCameraRereshUsers.subscribe((name:string) =>{
    //     this.videoconnect();
    //   });
    // }
     //###########################
    //##########On remove actvive user event#################
    if(this.datapeerService.subsVarCameraEventEmitter == undefined){
      this.datapeerService.subsVarCameraEventEmitter = this.datapeerService.invokeRemoveUactiveUser.subscribe((name:string) =>{
        this.removeActiveUser(this.datapeerService.userToRemove);
      });
    } 
    if(this.datapeerService.subsVarRefreshEventEmitter == undefined){
      this.datapeerService.subsVarRefreshEventEmitter = this.datapeerService.invokeCameraRereshUsers.subscribe((name:string) =>{
        this.onRefreshActiveUser();
      });
    }
     //###########################

    //connect all active users
    this.videoconnect();
    // }, 15 * 1000); // 4 seconds
    //  this.getAllActiveUsersInLesson();  
    
  }


  getLessons(_id: String): void {
    // this.id = _id;
  }
  
  //async videoconnect(): Promise<void> {
 videoconnect(isDesktop:boolean = false): void {

  this.cameraStreamArray.length = 0;
    var localpeer = this.peer;
    var curruserid = this.user.Id;
    //var video = this.myvideo.nativeElement;
    var myactiveusers = this.activeUsers;
    const md = navigator.mediaDevices as any;
    var getUserMediaDisplay = md.getDisplayMedia;

    // var cameraStreamL = this.cameraStream;
    var thisObject = this;
    
    if(!isDesktop)
        this.callAllUsersAndShowCamera(myactiveusers,curruserid,localpeer,thisObject);
    else
        this.callAllUsersAndShowDesktop(myactiveusers,curruserid,localpeer,thisObject);
      //??
    //this.ActiveUserScreen = this.cameraStreamArray.find(p => p.UserId === this.user.Id);
    console.log(this.ActiveUserScreen);
       

    //let a = this.cameraStreamArray.find(p => { return p.UserId == this.classLessonActive.teacherId });
  }

  callAllUsersAndShowCamera(myactiveusers,curruserid,localpeer,thisObject){
    var getUserMedia = navigator.getUserMedia ;
    getUserMedia({ video: true, audio: true }, (stream) => {
      
      thisObject.myStream = stream;
      // var stream =  md.getDisplayMedia({ video: true, audio: true }, (dstream) => {});
      // md.getDisplayMedia({ video: true, audio: true }, (stream) => {
             myactiveusers.forEach(element => {
               console.log('curruserid='+curruserid + " element.UserId=" + element.UserId);
               if (curruserid != element.UserId) {     

                 thisObject.callUser(element,localpeer,thisObject,stream);
               // thisObject.callUserSendDesktop(element, getUserMedia,localpeer,thisObject);
               }
               else {
                 console.log('same');
                 thisObject.viewLocalCam(element,localpeer,thisObject,stream);
                 //var srtm = thisObject.startCapture(thisObject, element,getUserMediaDisplay);
               }
         });
    }, (err) => {
      console.log('Failed to get local stream', err);
    });
  }
  
  async callAllUsersAndShowDesktop(myactiveusers,curruserid,localpeer,thisObject){
    
    const md = navigator.mediaDevices as any;
      // var stream =  md.getDisplayMedia({ video: true, audio: true }, (dstream) => {});
   var stream=  await md.getDisplayMedia({ video: true, audio: true }, (stream) => {
       
    }, (err) => {
      console.log('Failed to get local stream', err);
    });
    
    thisObject.myStream = stream;
    myactiveusers.forEach(element => {
      console.log('curruserid='+curruserid + " element.UserId=" + element.UserId);
      if (curruserid != element.UserId) {     

        thisObject.callUser(element,localpeer,thisObject,stream);
      // thisObject.callUserSendDesktop(element, getUserMedia,localpeer,thisObject);
      }
      else {
        console.log('same');
        thisObject.viewLocalCam(element,localpeer,thisObject,stream);
        //var srtm = thisObject.startCapture(thisObject, element,getUserMediaDisplay);
      }
});
  }

  callUser(element:ActiveUser,localpeer,thisObject, stream){
          
         
            console.log('element.sessionId='+element.sessionId);
            var call = localpeer.call(element.sessionId, stream);
            if(call!=undefined){
                      console.log('call='+call);
                      call.on('stream', (remoteStream) => {
                        //debugger;
                        //cameraStreamL = remoteStream;
                        //thisObject.cameraStream = remoteStream;
                        if (element.UserId == this.classLessonActive.teacherId) {
                            console.log('teacherId='+element.UserId);
                           // debugger;
                            var saveCamUser = undefined;
                            if(thisObject.ActiveUserScreen!=null && thisObject.ActiveUserScreen!=undefined ) 
                                  saveCamUser = thisObject.ActiveUserScreen;
                                
                            thisObject.ActiveUserScreen = {cameraStream:stream, activeUser:element};
                            thisObject.taecherActive = true;

                            if(saveCamUser!=undefined)
                               thisObject.pushActiveUser(thisObject,saveCamUser.cameraStream,saveCamUser.activeUser);


                        } else{
                            console.log('element.UserId='+element.UserId);
                            //thisObject.cameraStreamArray.push({cameraStream:remoteStream, activeUser:element});
                            thisObject.pushActiveUser(thisObject,remoteStream,element);
                        }
                        // Show stream in some video/canvas element.
                      });
            }else{
                console.log('user '+element.NameUser + "cannt be connect");
            }
  }

  
  async callUserSendDesktop(element:ActiveUser, getUserMedia,localpeer,thisObject){
          
    const md = navigator.mediaDevices as any;
    var getDisplayMedia = md.getDisplayMedia;
    // debugger;
    let stream = await md.getDisplayMedia({ video: true, audio: true }, (stream) => {
       
        
      }, (err) => {
        console.log('Failed to get local stream', err);
      });

      console.log('element.sessionId='+element.sessionId);
      var call =  localpeer.call(element.sessionId, stream);
      if(call!=undefined){
                console.log('call='+call);
                call.on('stream', (remoteStream) => {
                  if (element.UserId == this.classLessonActive.teacherId) {
                      console.log('teacherId='+element.UserId);
                      var saveCamUser = undefined;
                      if(thisObject.ActiveUserScreen!=null && thisObject.ActiveUserScreen!=undefined ) 
                            saveCamUser = thisObject.ActiveUserScreen;
                          
                      thisObject.ActiveUserScreen = {cameraStream:stream, activeUser:element};
                      thisObject.taecherActive = true;

                      if(saveCamUser!=undefined)
                         thisObject.pushActiveUser(thisObject,saveCamUser.cameraStream,saveCamUser.activeUser);

                  } else{
                      console.log('element.UserId='+element.UserId);
                      thisObject.pushActiveUser(thisObject,remoteStream,element);
                  }
                  // Show stream in some video/canvas element.
                });
      }else{
          console.log('user '+element.NameUser + "cannt be connect");
      }
}

  viewLocalCam(element:ActiveUser,localpeer,thisObject,stream ){
      //debugger;
      
     // this.ActiveUserScreen = {cameraStream:stream, activeUser:element};
        console.log('same='+this.taecherActive);
          if (thisObject.taecherActive)
            thisObject.pushActiveUser(thisObject,stream,element);
            //thisObject.cameraStreamArray.push({cameraStream:stream, activeUser:element});
          else
             this.ActiveUserScreen = {cameraStream:stream, activeUser:element};
   
      thisObject.isLoader=false;
  
  }

  
  viewLocalCamWithCam(element:ActiveUser, getUserMedia,localpeer,thisObject ){
    getUserMedia({ video: true, audio: true }, (stream) => {
      //debugger;
      
     // this.ActiveUserScreen = {cameraStream:stream, activeUser:element};
        console.log('same='+this.taecherActive);
          if (this.taecherActive)
          this.pushActiveUser(thisObject,stream,element);
            //thisObject.cameraStreamArray.push({cameraStream:stream, activeUser:element});
          else
             this.ActiveUserScreen = {cameraStream:stream, activeUser:element};
   
      thisObject.isLoader=false;
    }, (err) => {
      console.log('Failed to get local stream', err);
    });
  }
  
  showDesktop(){
    this.videoconnect(this.ShareOn);
  }

  async startCapture(thisObject, activeUser:ActiveUser,getUserMediaDisplay):Promise<any> {
    let captureStream = null;
    
    const md = navigator.mediaDevices as any;
    var getDisplayMedia = md.getDisplayMedia;
    try {
      captureStream = await md.getDisplayMedia({ video: true}, (stream) => {
      });
     //this.ActiveUserScreen = {cameraStream:captureStream, activeUser:activeUser};
     this.pushActiveUser(thisObject, captureStream, activeUser,true);
    } catch(err) {
      console.error("Error: " + err);
    }
    return captureStream;
  }

  pushActiveUser(thisObject,stream,activU:ActiveUser,pushAnyway:boolean = false){
    //pushAnyway=true;
    var dontPush:boolean = false;
    var index = 0;
    thisObject.cameraStreamArray.forEach((usercam,index) => {
      if(usercam.activeUser.UserId ==activU.UserId ){
        thisObject.cameraStreamArray[index] = {cameraStream:stream, activeUser:activU};
        dontPush=true;
      }
      index++;
    });
    if(!dontPush && this.ActiveUserScreen !=null && this.ActiveUserScreen.activeUser.UserId == activU.UserId)  {
      this.ActiveUserScreen = {cameraStream:stream, activeUser:activU};
      dontPush=true;
    }

    if(!dontPush || pushAnyway)
        thisObject.cameraStreamArray.push({cameraStream:stream, activeUser:activU});
  }


  removeActiveUser(autoremove:ActiveUser){
    
    this.activeUsers = this.datapeerService.getActiveUsers();
    this.cameraStreamArray.forEach((usercam,index) => {
      if(usercam.activeUser.UserId ==autoremove.UserId ){
        this.cameraStreamArray.splice(index,1);
      }
    });
    if(this.ActiveUserScreen != null && this.ActiveUserScreen.activeUser!=null &&
      this.ActiveUserScreen.activeUser.UserId == autoremove.UserId && autoremove.UserId != this.user.Id){
      this.ActiveUserScreen = this.cameraStreamArray.pop();
    }
  }

  onRefreshActiveUser(){
   
    this.activeUsers = this.datapeerService.getActiveUsers();

    this.cameraStreamArray.forEach(element => {
        if(element.activeUser.UserId != this.user.Id){
            this.refreshCamActiveUser(element);
            console.log("user=" + element.activeUser.NameUser + " CamActive=" + element.activeUser.showCamera);
            this.refreshEnableAudioAndVideo(element);
        }
    });

    if(this.ActiveUserScreen != null && this.ActiveUserScreen.activeUser != null
       && this.ActiveUserScreen.activeUser.UserId != this.user.Id){
        this.refreshCamActiveUser(this.ActiveUserScreen);
         this.refreshEnableAudioAndVideo(this.ActiveUserScreen);
    }
  }

  refreshEnableAudioAndVideo(camUser: UserVideo){
    if(camUser.cameraStream == null ||
       camUser.cameraStream.getVideoTracks() == null
       ) return;
    camUser.cameraStream.getVideoTracks()[0].enabled = camUser.activeUser.showCamera;
    if(camUser.cameraStream.getAudioTracks() != null && camUser.cameraStream.getAudioTracks().length > 0){      
      camUser.cameraStream.getAudioTracks()[0].enabled = camUser.activeUser.showMicrophone;
    }
  }

  refreshCamActiveUser(camUser: UserVideo){
    this.activeUsers.forEach(au => {
      if(au.UserId == camUser.activeUser.UserId) {
        camUser.activeUser.showCamera = au.showCamera;
        camUser.activeUser.showMicrophone = au.showMicrophone;
        return;
      }
    });
  }

  setActiveScreen(csa:UserVideo){
    this.cameraStreamArray.push(this.ActiveUserScreen);
    this.cameraStreamArray.splice(this.cameraStreamArray.indexOf(csa),1);
    this.ActiveUserScreen=csa;
    // alert("active");

  }
  
  

  async getAllActiveUsers():Promise<Array<ActiveUser>>{
    let ret :Array<ActiveUser>;
    console.log("start getAllActiveUsers");
    let userA: ActiveUser = JSON.parse(localStorage.getItem("activeUser"));
    // debugger;
    await this.usersService.GetActivesUsers(userA).subscribe(res => {
      
        console.log(res);
        ret = res;
        
        return ret;
        // this.videoconnect();
    }, err => {
      console.log(err)
      alert("שגיאה בקריאה לשירות");
    });
    return null;
  }
//    -webkit-transform: rotateY(180deg);
  //https://stackoverflow.com/questions/11642926/stop-close-webcam-stream-which-is-opened-by-navigator-mediadevices-getusermedia
  hideOrShowCamera(){
        //alert("its work!");
        this.usersService.setCameraState(this.user.Id,this.camOn).subscribe();

        if(this.ActiveUserScreen != undefined && this.ActiveUserScreen.activeUser.UserId == this.user.Id){
         // debugger;
          var camon = this.camOn;
          this.ActiveUserScreen.cameraStream.getVideoTracks()[0].enabled = this.camOn;
          
          /*this.ActiveUserScreen.cameraStream.getTracks().forEach(function(track) {
              if(!camon){
               // track.enabled=false;
                track.stop();
              }
              else {
                console.log(track);
                debugger;
                //track.start();
                track.enabled=true;
              }
          });*/
        }
        
        

  }
hideOrShowMicrophone():void{

  this.usersService.setMicrophoneState(this.user.Id,this.vlmOn).subscribe();

  if(this.ActiveUserScreen != undefined && this.ActiveUserScreen.activeUser.UserId == this.user.Id){
    // debugger;
    var vlmOn = this.vlmOn;
    if(this.ActiveUserScreen.cameraStream.getAudioTracks() != null)
      this.ActiveUserScreen.cameraStream.getAudioTracks()[0].enabled = this.vlmOn;
  }
}
  //set user as unactive in lesson
exitLesson():void
{
 
  this.ActiveUserScreen.cameraStream.getTracks().forEach(track => track.stop())
 /* this.ActiveUserScreen.cameraStream.getTracks().forEach(function(track)
   {
     // track.enabled=false;
      track.stop();

  // this.usersService.deleteUnactiveUser(this.user).subscribe();
});*/
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


