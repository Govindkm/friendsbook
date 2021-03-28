import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  constructor() { }

  ngOnInit(): void {
=======
=======
>>>>>>> Stashed changes
  all:boolean = true;
  parameter:string|number;
  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parameter=this.route.snapshot.paramMap.get("user");
    console.log(this.parameter);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  }

}
