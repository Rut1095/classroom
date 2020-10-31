import { Injectable, EventEmitter } from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeLessonCompnentFunction = new EventEmitter();

  onLessonListInitPeer(){
     this.invokeLessonCompnentFunction.emit();
  }

  constructor() { }
}
