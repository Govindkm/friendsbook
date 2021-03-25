import { Component, OnInit } from '@angular/core';


function range(start, end) {
  var numbers=[];

  for(var i=start;i<=end; ++i)
  {
    numbers.push(i);
  }

  return i;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  days:number[];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  years:number[]
  constructor() { 
    this.days=range(1,31);
    this.years=range(1900,2050);
  }

  ngOnInit(): void {
  }

}
