import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state:string;
  country: string;
  pincode:string;
  photoid: string;
  

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    //Get Active user data from service user.service
    //populate form
    //changes to form
    //go to submit

    this.userService.getActiveUser().subscribe(user =>{
      console.log(user)
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.phone = user.phone;
      this.city = user.city;
      this.state=user.state
      this.country = user.country;
      this.pincode = user.pincode;
      this.photoid=user.photoId;
    })
      

  }

  onSubmit(form:NgForm){
    console.log(form.value)
    //call userservice.updateuser
  }

}
