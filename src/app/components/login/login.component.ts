import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private registratioForm:NgForm;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  login(form:NgForm){
    
  }

  register()
  {
      const dialogRef = this.dialog.open(RegisterComponent, {
        width: '450px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.registratioForm = result;
      });

  }

}
