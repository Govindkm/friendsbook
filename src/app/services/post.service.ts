import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';

// for json server hosted locally baseURL is ---> https://localhost:3000
const postsURL = 'http://localhost:3000/posts';
@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {
  constructor(private authService: AuthenticationService, private http: HttpClient, private usersService: UsersService) {
  }
  ngOnInit(): void {
  }

  // new post creation
  post(post: any) {
    console.log("Post Service Accessing Post");
    console.log(post);
    var loggedInUserId = this.authService.isUserLoggedIn();
    if (loggedInUserId) {
      this.usersService.getUser(+loggedInUserId).subscribe(data => {
        if (!data['posts']) {
          data['posts'] = 1;
        }
        else {
          data['posts'] = (+data['posts'] + 1);
        }
        this.usersService.updateUser(+loggedInUserId, data);
      });
      return this.http.post(postsURL, post);
    }
    else {
      return throwError({ status: 401, error: { message: "Not Logged In!!!" } });
    }
  }

  getPosts(){
    return this.http.get(postsURL+'?_sort=time&_order=desc');
  }

  updatePost(postId:number, postData){
    this.http.put(postsURL + '/' + postId, postData).subscribe((response)=>{
      console.log(response);
    })
  }
}
