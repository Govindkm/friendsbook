import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FakeBackendService } from 'src/app/interceptors/fake-backend.interceptor';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterComponent } from '../register/register.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private registrationForm:NgForm;
  isValid: boolean;

  constructor(private dialog:MatDialog, private authService:AuthenticationService, 
    private router:Router,
    private Fbend:FakeBackendService) {
    this.isValid = true;
   }

  ngOnInit(): void {
  }

  login(form:NgForm){
    this.authService.authenticate(form.value.email, form.value.password)
    .subscribe(
      // authenticate : success
      (response)=>{
        console.log(response);
        this.router.navigate(['/home']);
        this.isValid = true;
      },
      // unautherized : failure
      (error)=>{
        console.log(error);
        this.isValid = false;
      }
    );
  }

  register()
  {
      const dialogRef = this.dialog.open(RegisterComponent, {
        width: '450px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The Registration dialog was closed');
        // console.log(result.password);
        result.password = "Bearer " + window.btoa(result.email + ":" + result.password)
        // console.log(result.password)
        sessionStorage.setItem('currentUser', JSON.stringify(result));
        this.registrationForm = result;
        this.Fbend.NewReg()
      });

  }

  ResetPwd()
  {
      const dialogRef = this.dialog.open(ResetPasswordComponent, {
        width: '450px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        console.log('The reset-Pwd dialog was closed');
      });

  }

}
