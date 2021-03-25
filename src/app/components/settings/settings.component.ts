import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Get Active user data from service user.service
    //populate form
    //changes to form
    //go to submit
  }

  onSubmit(form:NgForm){
    console.log(form.value)
    //call userservice.updateuser
  }

}
