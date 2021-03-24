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
  activeUser:any;
  isPhoto:boolean;
  constructor(private postService:PostService) {
    this.activeUser = sessionStorage.getItem("loginId");
   }

  ngOnInit(): void {
  }

  onPost(form:NgForm){
   // console.log(form);
   var post = {
     "email":this.activeUser.email,
     "post":form.value.post,
     "time":Date.now(),
     "isActive":true,
   }
   this.postService.post(post);
  
  }

  onHidePostClick(){
    
  }

}
