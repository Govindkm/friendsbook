import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class FakeBackendService implements HttpInterceptor{

  

  constructor(private http: HttpClient) { }

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
              return next.handle(request); 
            return this.unauthorized();  
    }
  }

  isValid(headers?){
    let authenticationToken =  headers.get("Authorization");
    // check auth token with all user
    console.log("isValid check")
    let user = users.find(user => authenticationToken === user.password);
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
      // console.log(response)
      response.forEach(x=>{
        let nuserobj = new User_BE(x.email,x.password,x.firstName,false)
        this.newUserAuth.push(nuserobj)
      })
      console.log(this.newUserAuth)
      // console.log("out")
      // newUserAuth= response.toString
      
<<<<<<< Updated upstream:src/app/interceptor/fake-backend.interceptor.ts
      
=======
>>>>>>> Stashed changes:src/app/interceptors/fake-backend.interceptor.ts
      let nUser=this.newUserAuth.find(user => authenticationToken === user.password);
      // let user = users.find(user => authenticationToken === "Bearer " + window.btoa(user.loginId + ":" + user.password));
      console.log(nUser)
      // console.log(nUser)
<<<<<<< Updated upstream:src/app/interceptor/fake-backend.interceptor.ts
=======
      this.newUserAuth=[]
>>>>>>> Stashed changes:src/app/interceptors/fake-backend.interceptor.ts
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
    return throwError({status : 401, error : {message : "Unauthorized"}});
  }

  NewReg(){
    console.log("FAKE BACKEND")
    let newUser=JSON.parse(sessionStorage.getItem('currentUser'))
    console.log(newUser)
    this.http.post(server_URL,newUser).subscribe(response=>{
      // console.log(response)
    })
<<<<<<< Updated upstream:src/app/interceptor/fake-backend.interceptor.ts
    let authenticationToken = "Bearer " + window.btoa(newUser['email'] + ":" + newUser['password'])
    let newUserObj = new User_BE(newUser['email'],authenticationToken,newUser['firstName'],false)
    users.push(newUserObj)
=======
    // let authenticationToken = "Bearer " + window.btoa(newUser['email'] + ":" + newUser['password'])
    // let newUserObj = new User_BE(newUser['email'],authenticationToken,newUser['firstName'],false)
    // users.push(newUserObj)
>>>>>>> Stashed changes:src/app/interceptors/fake-backend.interceptor.ts
    console.log("New User Addition")
    // console.log(users)
  }
}
