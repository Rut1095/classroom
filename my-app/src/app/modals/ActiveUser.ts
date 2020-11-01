import { Time } from '@angular/common';

export class ActiveUser {
    UserId: number;
    ClassLessonId: number;
    ConnectTime: Time;
    sessionId: number;
    NameUser:string;

    active: boolean;
    
}