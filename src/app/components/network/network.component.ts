import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

<<<<<<< Updated upstream
  constructor() { }

  ngOnInit(): void {
=======
  all:boolean = true;
  parameter:string|number;
  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parameter=this.route.snapshot.paramMap.get("user");
    console.log(this.parameter);
>>>>>>> Stashed changes
  }

}
