import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

// for json server hosted locally baseURL is ---> https://localhost:3000
const serverURL = 'https://localhost:3000/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {
  constructor(private authService:AuthenticationService, private http:HttpClient) { 
  }
  ngOnInit(): void {
  }
  post(post:any){
    console.log("Post Service Accessing Post");
    console.log(post);
    var isLoggedIn = this.authService.isUserLoggedIn();
    if(isLoggedIn)
    return this.http.post(serverURL,post).subscribe(response=>{
      console.log(response);
    });
    else{
      return throwError({status : 401, error : {message : "Not Logged In!!!"}});
    }
  }
}
