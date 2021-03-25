import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User_BE } from '../models/user_be.model';
import {map, switchMap} from 'rxjs/operators'
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';



// credential repository/collection
let users : Array<User>

const server_URL= "http://localhost:3000/users"

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService implements HttpInterceptor{

  status:boolean

  constructor(private http: HttpClient, private usersService:UsersService) {
    
   }
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
          return next.handle(request);

      case url.endsWith("/posts"):
          return next.handle(request);
      
      default :
            //console.log(users);
            if(this.isValid(headers)){ console.log("Status Update")
            if(this.status){
              console.log("passed")
              return next.handle(request); 
            }
            console.log("FAIL")
            return this.unauthorized(); 
          }
            
    }
  }

  isValid(headers?){
    let authenticationToken =  headers.get("Authorization");
    this.usersService.getUsers()
    .subscribe(data=>{
      //console.log(data);
      users = data;
      console.log(users)
      let user = users.find(user => authenticationToken === user.password);
      console.log("user");
      
      console.log(user)
      
      if(user){
        this.status=true
        console.log(this.status)
        return true;
      }
      else{
        this.status=false
        console.log(this.status)
        return false;
      }
    })
    // console.log(users)
    // check auth token with all user
    return true
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
      // console.log(response)
      response.forEach(x=>{
        let nuserobj = new User_BE(x.email,x.password,x.firstName,false, x.id)
        this.newUserAuth.push(nuserobj)
      })
      console.log(this.newUserAuth)
      // console.log("out")
      // newUserAuth= response.toString
      
      let nUser=this.newUserAuth.find(user => authenticationToken === user.password);
      // let user = users.find(user => authenticationToken === "Bearer " + window.btoa(user.loginId + ":" + user.password));
      console.log(nUser)
      // console.log(nUser)
      this.newUserAuth=[]
      if(nUser){
        // credentials are valid store user id to enable user editing using json server
        sessionStorage.setItem('id', nUser.userId.toString());
        console.log(this.authorized(nUser))
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

  NewReg(){
    console.log("FAKE BACKEND")
    let newUser=JSON.parse(sessionStorage.getItem('currentUser'))
    newUser['isAdmin'] = false;
    newUser['isActive'] = false;
    console.log(newUser)
    this.http.post(server_URL,newUser).subscribe(response=>{
      // console.log(response)
    })
    // let authenticationToken = "Bearer " + window.btoa(newUser['email'] + ":" + newUser['password'])
    // let newUserObj = new User_BE(newUser['email'],authenticationToken,newUser['firstName'],false)
    // users.push(newUserObj)
    console.log("New User Addition")
    // console.log(users)
    sessionStorage.clear();
  }
}
