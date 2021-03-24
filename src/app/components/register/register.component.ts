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
 
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
