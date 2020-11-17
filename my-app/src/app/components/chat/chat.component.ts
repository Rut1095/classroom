import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ActiveUser } from 'src/app/modals/ActiveUser';
import { User } from 'src/app/modals/user.modal';
import { DatapeerService } from 'src/app/services/datapeer.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit , AfterViewChecked{
peer;
  
  chatClick:boolean=false;
  mymessage: String;
  messagesStr: String = "";
  messageArr:any[]=[]
  
  thisSend:string="123456789";
  newMsg:string= '';
  user: User;
  activeUsers: Array<ActiveUser>;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  constructor(private datapeerService:DatapeerService, private router:Router) { }
  

  ngOnInit(): void {
    this.scrollToBottom();


    console.log("chat on init");
    
    this.user = JSON.parse(localStorage.getItem("userDetails"));
    
    this.peer = this.datapeerService.getPeer();
    this.activeUsers =this.datapeerService.getActiveUsers();
    this.initPeerChatConnection();
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  initPeerChatConnection():void{

       var msgArr = this.messageArr;
        this.peer.on('connection', function(conn) {
          //console.log(conn);
        //  debugger;
// 'ID', 'userName'ID:number,userName:string,,
          conn.on('data', function(data){
            this.user = JSON.parse(localStorage.getItem("userDetails"));

            // Will print 'hi!'
            //console.log(data);
            console.log('hi!');
            console.log(data.message);
            // console.log(ID);
            //this.messagesStr += this.mymessage + "\n";
           /// debugger;

            msgArr.push({id:'ID ',name:data.userName ,message:data.message});
            

          });
        });  
  }
  sendMessage():void{
    var thisobject = this;
    var msg = this.newMsg;
       this.messageArr.push({id:this.thisSend,name:this.user.UserName,message:this.newMsg});
       //.scrollIntoView()
        this.activeUsers =this.datapeerService.getActiveUsers();
        if(this.activeUsers == null) return;
        this.activeUsers.forEach(element => {
          if(this.user.Id != element.UserId) {
            //alert(element.sessionId);
            var conn = this.peer.connect(element.sessionId);
            // on open will be launch when you successfully connect to PeerServer
            conn.on('open', function(){
                // here you have conn.id
                //console.log(this.mymessage);
                console.log(msg);
                //conn.send('hi2!');
                //debugger;
// thisobject.user.Id, thisobject.user.UserName,


                conn.send( {message:msg, userName:thisobject.user.UserName} );
                
      //          alert(msg);
             });
          }
       });

       this.newMsg="";
     }  
}
