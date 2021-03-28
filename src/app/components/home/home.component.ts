import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(ProfileComponent) profile:ProfileComponent;
  constructor(private user:UsersService) { }

  ngOnInit(): void {
  }

  updateProfile(){
    //console.log('Post Emits')
    this.profile.update();
  }

}
