import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:Post[] = [];
  isLoading:boolean = false;
  activeUserEmail:any;
  activeUserObject:User;
  isPhoto:boolean;
  constructor(private postService:PostService, private userService:UsersService, 
    private authService:AuthenticationService, private utility:UtilityService) {
    this.activeUserEmail = sessionStorage.getItem("email");
   }

  ngOnInit(): void {
    this.userService.getActiveUser().subscribe((data)=>{this.activeUserObject=data});
    this.updatePostList();
  }

  onPost(form:NgForm){
   var post = {
     "email":this.activeUserEmail,
     "post":form.value.post,
     "time":Date.now().toString(),
     "isActive":true,
     "image":null
   }
   form.reset();
   this.postService.post(post);
   this.updatePostList();
  }

  updatePostList()
  {
    this.posts = [];
    this.postService.getPosts().subscribe((posts:Object[]) => {
      posts.forEach(post => {
        console.log(post['time']);
        post['time'] = this.utility.dateDifference(post['time']);
        this.posts.push(new Post(post['id'], post['email'], post['post'], post['time'], post['isActive'], post['image']));
      });
      console.log(this.posts);
    })
  }

  onHidePostClick(){
    
  }

}
