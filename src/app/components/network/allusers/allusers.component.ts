import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  users:User[];
  activeUser:User;
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.updateUsers();
  }

  sendRequest(id:number){
    this.userService.sendFriendRequest(id);
    delay(2000);
    this.updateUsers();
  }

  acceptRequest(id:number){
    this.userService.acceptFriendRequest(id);
    delay(500);
    this.updateUsers();
  }

  updateUsers(){

    this.userService.getActiveUser().subscribe((response)=>{
      this.activeUser = response;
    })

    delay(1000);

    this.userService.getUsers().subscribe(users=>{
      this.users = users;
      var index = this.users.findIndex((user)=>{return (user.id == this.activeUser.id)});
      this.users.splice(index, 1);
      console.log(users);
    });
  }

}
