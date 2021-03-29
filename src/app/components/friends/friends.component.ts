import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  activeUser:User;
  friends:User[]=[];
  private allUsers:User[];
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response)=>{
      this.allUsers = response;
    })

    delay(1000);
    
    this.userService.getActiveUser().subscribe((response)=>{
      this.activeUser = response;
      this.activeUser.friends.forEach(element => {
          this.friends.push(this.allUsers.find((user)=>{return element === +user.id}));        
      });
    })
  }

}
