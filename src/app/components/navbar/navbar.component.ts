import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
    isUserloggedin:string|false = false;

    constructor(private router:Router,
      private authService:AuthenticationService
      ) { 
        this.isUserloggedin= this.authService.isUserLoggedIn()
        // console.log("ROUTER CHANGE LOGIN STATUS")
        console.log(this.isUserloggedin)
      }
  
    ngOnInit(){
      this.router.events.subscribe(event =>{
        if (event instanceof NavigationStart){
          //  console.log(event.url)
          //  console.log("ROUTER CHANGE LOGIN STATUS")
           this.isUserloggedin= this.authService.isUserLoggedIn()
          //  console.log(this.isUserloggedin)
        }
     })
    }
}
