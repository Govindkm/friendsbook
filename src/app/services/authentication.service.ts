import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

const LOGIN_URL = "http://localhost:4200/users/login";

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  constructor(private http: HttpClient,
    private router: Router
    ) { }


    // create a authentication token
  // }
  authenticate(email:string, password : string){
    // create a authentication token
    let authenticationToken = "Bearer " + window.btoa(email + ":" + password);
    console.log(authenticationToken);

    // add token to header
    let headers = new HttpHeaders({
      Authorization : authenticationToken
    });

    return this.http.get(LOGIN_URL, {headers})
    // store the token in session
    .pipe(
      map(successData=>{
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("token", authenticationToken);
        return successData;
      }),
      map(failureData=>{
        return failureData;
      }));

  }

  // to return Auth Token
  getAuthenticationToken(){
    if(this.isUserLoggedIn())
      return sessionStorage.getItem("token");
    return null;  
  }

  // to check if any user is logged in
  isUserLoggedIn(){
    let loginId = sessionStorage.getItem("email");
    if(loginId == null)
      return false;
    return true;  
  }

  // logout 
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
