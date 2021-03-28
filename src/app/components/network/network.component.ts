import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  all:boolean = true;
  parameter:string|number;
  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parameter=this.route.snapshot.paramMap.get("user");
    console.log(this.parameter);
  }

}
