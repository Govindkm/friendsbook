import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User_BE } from '../models/user_be.model';
import {map, switchMap} from 'rxjs/operators'



// credential repository/collection
let users : Array<User_BE> = [
  new User_BE("first@mail.com", "abc", "User1", true),
  new User_BE("second@mail.com", "abc", "User2", true),
  new User_BE("third@mail.com", "abc", "User3", false),
  new User_BE("fourth@mail.com", "abc", "User4",false)
];

const server_URL= "http://localhost:3000/users"

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService implements HttpInterceptor, OnInit{

  

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  newUserAuth:Array<User_BE>=[];
  intercept(request: HttpRequest<any>, next: HttpHandler
    
    ): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;
    switch(true){
      case url.endsWith("/users/login") && method === "GET":  // req : 1
          // validate the credential
          return this.authenticate(headers);
          
      case url.endsWith("/users") :
          return next.handle(request)
      default :  
            if(this.isValid(headers))
              {
                console.log("Forwarding to next server.");
                return next.handle(request); 
              }
              {
                console.log("Unauthorized access!!!");
                return this.unauthorized();
              }
                
    }
  }

  updateUsers(){
   console.log("inside update users");
  }

  isValid(headers?){
    this.updateUsers();
    let authenticationToken =  headers.get("Authorization");
    // check auth token with all user
    let user = users.find(user => authenticationToken === "Bearer " + window.btoa(user.loginId + ":" + user.password));
    console.log("Local user list : " + users);
    console.log("Matched user is : " + user);
    if(user){
        return true;
    }else{
      return false;
    }
  }

  authenticate(headers?){
    let authenticationToken =  headers.get("Authorization");
    // check auth token with all user
    
    return this.http.get<any>(server_URL).
    // pipe(map(Ulist => {
    //   return {
    //     users: Ulist.features.map(x=x)
    //   }
    // })).
    pipe(switchMap(response=>{
      console.log("LOGIN AUTHENTICATE")
      console.log(response)
      response.forEach(x=>{
        let nuserobj = new User_BE(x.email,x.password,x.firstName,false)
        this.newUserAuth.push(nuserobj)
      })
      console.log(this.newUserAuth)
      console.log("out")
      // newUserAuth= response.toString
      console.log("hi")
      let nUser=this.newUserAuth.find(user => authenticationToken === "Bearer " + window.btoa(user.loginId + ":" + user.password));
      let user = users.find(user => authenticationToken === "Bearer " + window.btoa(user.loginId + ":" + user.password));
      console.log(nUser)
      console.log(nUser)
      if(nUser){
        // credentials are valid
        return this.authorized(nUser);
      }else{
        return this.unauthorized();
    }

    }));
    
  }

  authorized(body?){
    // create and return an Observable : success
    return of(new HttpResponse({status : 200, body}));
  }

  unauthorized(){
    // create and return an Observable : error
    return throwError({status : 401, error : {message : "Unautherized"}});
  }

  NewReg(newUser){
    console.log("FAKE BACKEND");
    newUser=JSON.parse(newUser);
    console.log(newUser);
    this.http.post(server_URL,newUser).subscribe(response=>{
      console.log(response);
    })
    let newUserObj = new User_BE(newUser['email'],newUser['password'],newUser['firstName'],false)
    users.push(newUserObj);
    console.log("New USer Addition");
    console.log(users);
  }
}
