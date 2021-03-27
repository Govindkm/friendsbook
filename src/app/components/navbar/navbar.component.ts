import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
    users
    isUserloggedin:string|false = false;

    constructor(private router:Router,
      private authService:AuthenticationService,
      private userService:UsersService
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

    Search(id){
        console.log(id)
        if(Number(id)){
          console.log("This is a number: ",Number(id))
          let n=Number(id)
          this.userService.getUsers().subscribe(response=>{
            console.log(response)
            let user = response.find(user =>{
              if(id==user.id){
                return user
              }
            })
            console.log(user)
            this.router.navigate(['network',user.id])
            return user
          })
        
        }
        else{
          console.log("This is not a number: ",id)
          this.userService.getUsers().subscribe(response=>{
            console.log(response)
            let user = response.find(user =>{
              if(id==user.email){
                return user
              }
            })
            console.log(user)
            this.router.navigate(['network',user.email])
            return user
          })
        }
    }
}
