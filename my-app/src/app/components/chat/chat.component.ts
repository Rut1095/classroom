import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mymessage: String;
  messagesStr: String = "";
  messageArr:any[]=[
    {
      id:"123456789",
      name:"ruity",
      message:"svdsga",

    },
    {
      id:"123456784",
      name:"hodaya",
      message:"svansafQG",

    },
    {
      id:"123456789",
      name:"ruity",
      message:"ksfcwanwvowJFPAOFKQOFJVQI3",

    }
  ];
  thisSend:string="123456789";
  newMsg:string= '';

  constructor() { }

  ngOnInit(): void {
  }
  sendMessage():void{
    // this.mymessage += "שלום";
       //this.messagesStr += this.mymessage + "\n";
       this.messageArr.push({id:this.thisSend,name:"rut",message:this.newMsg});
       this.newMsg="";
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
     }  
}
