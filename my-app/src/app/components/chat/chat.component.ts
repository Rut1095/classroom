import { Component, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit {

  chatClick:boolean=false;
  peer;
  mymessage: String;
  messagesStr: String = "";
  messageArr:any[]=[
    {
      id:"123456789",
      name:"ruty",
      message:"svdsga",

    },
    {
      id:"123456784",
      name:"hodaya",
      message:"svansafQG",

    },
    {
      id:"123456789",
      name:"ruty",
      message:"ksfcwanwvowJFPAOFKQOFJVQI3",

    }   
  ];
  thisSend:string="123456789";
  newMsg:string= '';
  user: User;
  activeUsers: Array<ActiveUser>;

  constructor(private datapeerService:DatapeerService, private router:Router) { }

  ngOnInit(): void {
    console.log("chat on init");
    
    this.user = JSON.parse(localStorage.getItem("userDetails"));
    
    this.peer = this.datapeerService.getPeer();
    this.activeUsers =this.datapeerService.getActiveUsers();
    this.initPeerChatConnection();
  }

  initPeerChatConnection():void{
        //chat
        
       var msgArr = this.messageArr;
        this.peer.on('connection', function(conn) {
          //console.log(conn);
          conn.on('data', function(data){
            // Will print 'hi!'
            //console.log(data);
            console.log('hi!');
            console.log(data);
            //this.messagesStr += this.mymessage + "\n";
            msgArr.push({id:"1223",name:"x",message:data});
          });
        });  
  }

  sendMessage():void{

   // this.user = JSON.parse(localStorage.getItem("userDetails"));
    // this.activeUsers =this.datapeerService.getActiveUsers();

    var msg = this.newMsg;
    // this.mymessage += "שלום";
       //this.messagesStr += this.mymessage + "\n";
       this.messageArr.push({id:this.thisSend,name:this.user.UserName,message:this.newMsg});

       
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
                conn.send(msg);
      //          alert(msg);
             });
          }
       });

       this.newMsg="";
     }  
}
