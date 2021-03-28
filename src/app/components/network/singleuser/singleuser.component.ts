import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {

  all:boolean = true;
  parameter;
  user;
  constructor(private router:Router,private route: ActivatedRoute,private userService:UsersService) { }

  ngOnInit(): void {
    this.parameter=this.route.snapshot.paramMap.get("user");
    if(Number(this.parameter)){
      this.userService.getUser(this.parameter).subscribe(users=>{
        this.user = users;
        console.log(this.user)
      });
    }
    else{
      this.userService.getUserbyemail(this.parameter).subscribe(users=>{
      this.user = users[0];
      console.log(this.user)
    })
    
  }
}

  sendRequest(user){
    console.log("sendRequest")
    console.log(user)
  }

}

