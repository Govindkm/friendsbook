import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeUserObject: User;
  existingPhotoId: String;
  noOfPosts: Number = 0;
  noOfConnections: Number = 0;
  imageToShow: String | ArrayBuffer;
  isImageLoaded: Boolean = false;
  isImageAvailable: Boolean = false;
  constructor(private user:UsersService) { }

  ngOnInit(): void {
    this.user.getActiveUser().subscribe((data)=>{
      this.activeUserObject = data;
      this.noOfPosts = this.activeUserObject.posts;
      this.noOfConnections = this.activeUserObject.friends.length;
      this.setDefaultProfile();
    });
  }

  update(){
    //console.log('update called');
    this.user.getActiveUser().subscribe((data)=>{
      this.activeUserObject = data;
      this.noOfPosts = this.activeUserObject.posts;
      this.noOfConnections = this.activeUserObject.friends.length;
    });
  }

  setDefaultProfile(){
    this.isImageLoaded = true;
    this.isImageAvailable = true;
    this.imageToShow = this.activeUserObject.photoId;
  }


  loadActiveUserPhoto(){}

  loadNoOfPosts(){}

  loadNoOfConnections(){}

  loadImageToShow(){}

  onProfilePhotoUpload(event){
    console.log(event);
  }
  
}
