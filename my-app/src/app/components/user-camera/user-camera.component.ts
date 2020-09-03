import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-camera',
  templateUrl: './user-camera.component.html',
  styleUrls: ['./user-camera.component.css']
})
export class UserCameraComponent implements OnInit {
  peer;
  peerid;

  constructor() { }

  ngOnInit(): void {
  }

}
