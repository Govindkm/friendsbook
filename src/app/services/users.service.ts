import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';

const requestURL = "http://localhost:3000/user/"
const usersURL = 'http://localhost:3000/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getUser(id: Number) {
    var url = usersURL + '/' + id;
    return this.http.get(url);
  }

  getUsers() {
    return this.http.get(usersURL)
      .pipe(map(allUsers => {
        const users = [];
        for (let key in allUsers) {
          var responseData = allUsers[key];
          users.push(new User(responseData['id'], responseData['firstName'], responseData['lastName'], responseData['dob'], responseData['gender'], responseData['email'], responseData['posts'], responseData['password'], responseData['isAdmin'], true, responseData['phone'], responseData['city'], responseData['state'], responseData['country'], responseData['pincode'], responseData['photoId'], responseData['requests'], responseData['requested'], responseData['friends']));
        }
        //console.log(users);
        return users;
      }))
  }

  getActiveUser() {
    if (this.auth.isUserLoggedIn()) {
      var url = usersURL + '/' + this.auth.isUserLoggedIn();
      return this.http.get(url)
        .pipe(map(responseData => {
          const user: User = new User(responseData['id'], responseData['firstName'], responseData['lastName'],

            responseData['dob'], responseData['gender'], responseData['email'], responseData['posts'],

            responseData['passwprd'], responseData['isAdmin'], true, responseData['phone'], responseData['city'],

            responseData['state'], responseData['country'], responseData['pincode'], responseData['photoId'],
            responseData['requests'], responseData['requested'], responseData['friends']);
          return user;
        }));
    }
  }

  getUserbyemail(email){
    return this.http.get(usersURL)
    .pipe(map(allUsers=>{
      const user=[];
      for(let key in allUsers){
        var responseData = allUsers[key].email;
        if (responseData==email){
          user.push(allUsers[key])
        }
              }
      //console.log(users);
      return user;
    }))
  }

  sendFriendRequest(id: number) {
    this.getUser(+sessionStorage.getItem('id')).subscribe((response) => {

      //update the requests list of requested user
      this.getUser(id).subscribe((response) => {
        console.log(response)
        if (response['requests'] === null) {
          response['requests'] = []
        }

        response['requests'].push(+sessionStorage.getItem('id'));
        console.log(response['requests']);

        this.updateUser(id, response);
      });

      //update the requested list of active user
      if (response['requested'] === null) {
        response['requested'] = [];
      }
      response['requested'].push(id);
      this.updateUser(+sessionStorage.getItem('id'), response);
    });
  }

  acceptFriendRequest(id:number){
    this.getUser(+sessionStorage.getItem('id')).subscribe((response)=>{
      response['friends'].push(id);
      
      this.getUser(id).subscribe((response)=>{
        response['friends'].push(+sessionStorage.getItem('id'));
        this.updateUser(id,response);
        delay(500);
      });
      this.updateUser(+sessionStorage.getItem('id'),response);
      delay(500);
    })
  }


  updateUser(id: Number, dataToAdd) {
    console.log(dataToAdd)
    this.http.patch(usersURL + '/' + id, dataToAdd).subscribe((response) => {
      console.log(response);
    })
  }
}
