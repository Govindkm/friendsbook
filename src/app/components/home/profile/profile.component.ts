import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeUserObject: any;
  existingPhotoId: String;
  noOfPosts: Number = 0;
  noOfConnections: Number = 0;
  imageToShow: String | ArrayBuffer;
  isImageLoaded: Boolean = false;
  isImageAvailable: Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  loadActiveUser(){}

  loadActiveUserPhoto(){}

  loadNoOfPosts(){}

  loadNoOfConnections(){}

  loadImageToShow(){}

  onProfilePhotoUpload(event){}
  
}
