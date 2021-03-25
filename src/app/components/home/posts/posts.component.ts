import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:Post[];
  isLoading:boolean = true;
  activeUserEmail:any;
  isPhoto:boolean;
  constructor(private postService:PostService) {
    this.activeUserEmail = sessionStorage.getItem("email");
   }

  ngOnInit(): void {
  }

  onPost(form:NgForm){
   var post = {
     "email":this.activeUserEmail,
     "post":form.value.post,
     "time":Date.now(),
     "isActive":true,
     "image":null
   }
   this.postService.post(post);
  
  }

  onHidePostClick(){
    
  }

}
