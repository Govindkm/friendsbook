import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:Post[];
  isLoading:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  onPost(){

  }

  onHidePostClick(){
    
  }
}
