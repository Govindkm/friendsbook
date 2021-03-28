<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
>>>>>>> Stashed changes
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
<<<<<<< Updated upstream
  posts:Post[];
  isLoading:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  onPost(){

=======
  @Output() postUpdated = new EventEmitter<void>();
  
  posts:Post[] = [];
  isLoading:boolean = true;
  activeUserEmail:any;
  activeUserObject:User;
  
  constructor(private postService:PostService, private userService:UsersService, 
    private authService:AuthenticationService, private utility:UtilityService) {
    this.activeUserEmail = sessionStorage.getItem("email");
   }

  ngOnInit(): void {
    console.log("NGONINIT")
    this.userService.getActiveUser()
    .subscribe((data)=>{
      this.activeUserObject=data;
      console.log("HERE be POSTS");
      console.log(this.activeUserObject);
      this.updatePostList();
      this.isLoading = false;
    });
    
    // this.updatePostList();
   
  }

  onPost(form:NgForm){
    var userIcon:string;
    if(this.activeUserObject.photoId){
      userIcon = this.activeUserObject.photoId;
    }
   var post = {
     "email":this.activeUserEmail,
     "name":this.activeUserObject.firstName + ' ' + this.activeUserObject.lastName,
     "post":form.value.post,
     "time":Date.now().toString(),
     "isActive":true,
     "image":null,
     "userIcon":userIcon,
   }
   form.reset();
   this.postService.post(post)
   .subscribe((response)=>{
      this.updatePostList();

      // Emits event to inform that post was updated and so user profile needs to be changed
      this.postUpdated.emit();
      
      console.log(response);
   })
  }

  updatePostList()
  {
    this.posts = [];
    this.postService.getPosts().subscribe((posts:Object[]) => {
      posts.forEach(post => {
        post['time'] = this.utility.dateDifference(post['time']);
        this.posts.push(new Post(post['id'], post['email'], post['name'] ,post['post'], post['time'], post['isActive'], post['image'], post['userIcon']));
      });
      console.log(this.posts);
      this.isLoading = false;
    }
    
    )
>>>>>>> Stashed changes
  }

  onHidePostClick(){
    
  }

}
