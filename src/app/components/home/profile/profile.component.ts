import { AfterContentInit, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterContentInit {
  activeUserObject: User;
  existingPhotoId: String;
  noOfPosts: Number = 0;
  noOfConnections: Number = 0;
  imageToShow: String | ArrayBuffer;
  isImageLoaded: Boolean = false;
  isImageAvailable: Boolean = false;
  constructor(private user:UsersService) { }

  ngAfterContentInit(): void {
    this.user.getActiveUser().subscribe((data)=>{
      this.activeUserObject = data;
      this.noOfPosts = this.activeUserObject.posts;
      this.setDefaultProfile();
    });
  }

  update(){
    //console.log('update called');
    this.user.getActiveUser().subscribe((data)=>{
      this.activeUserObject = data;
      this.noOfPosts = this.activeUserObject.posts;
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
