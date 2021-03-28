import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  password:string;
  iseditingpwd:boolean = false;
  

  constructor(private userService:UsersService,private router:Router) { }

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
      this.password=user.password;
    })
      

  }

  onSubmit(form:NgForm){
    const id = +sessionStorage.getItem('id')
    console.log(form.value)
    this.userService.updateUser(id,form.value)
    this.router.navigate(['home'])
    
    //call userservice.updateuser
  }

  isedit(){
    this.iseditingpwd=!this.iseditingpwd;
    return this.iseditingpwd;
  }

}
