import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';

const usersURL = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public activeUser:User;
  constructor(private http:HttpClient, private auth:AuthenticationService) { }
  
  getUser(id:Number){
    var url = usersURL + '/' + id;
    return this.http.get(url);
  }

  getUsers(){
    return this.http.get(usersURL)
    .pipe(map(allUsers=>{
      const users = [];
      for(let key in allUsers){
        var responseData = allUsers[key];
        users.push(new User(responseData['id'],responseData['firstName'],responseData['lastName'],responseData['dob'], responseData['gender'],responseData['email'],responseData['posts'], responseData['password'] ,false, true, responseData['phone'], responseData['city'], responseData['state'], responseData['country'], responseData['pincode'], responseData['photoId']));
      }
      //console.log(users);
      return users;
    }))
  }

  getActiveUser()
  {
    if(this.auth.isUserLoggedIn()){
        var url = usersURL + '/' + this.auth.isUserLoggedIn();
        return this.http.get(url)
        .pipe(map(responseData => {
          const user:User = new User(responseData['id'],responseData['firstName'],responseData['lastName'],
          
          responseData['dob'], responseData['gender'],responseData['email'],responseData['posts'],

          responseData['passwprd'],responseData['isAdmin'], true, responseData['phone'], responseData['city'], 

          responseData['state'], responseData['country'], responseData['pincode'], responseData['photoId']);
          return user;
        }));        
    }
  }
  
  updateUser(id:Number, dataToAdd){

    this.http.patch(usersURL + '/' + id,dataToAdd).subscribe((response)=>{
      console.log(response);
    })
  }
}
