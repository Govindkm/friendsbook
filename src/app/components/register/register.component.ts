import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const server_URL= "http://localhost:3000/users"
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
  emailList:Array<string>=[]

  email: string;

  notAvailable:string;

  clicked:boolean = false;

  constructor(private http:HttpClient) { 
    this.days=range(1,31);
    this.years=range(1900,2050);
  }

  ngOnInit(): void {

    this.http.get<any>(server_URL).subscribe(response =>{
      console.log(response)
      response.forEach(y => {
        
        this.emailList.push(y.email)
        
      })
      console.log(this.emailList)

    })
  }

  checkAvailablity(email){
    this.clicked=true;
    // console.log("this is the input")
    console.log(email.value)
    // console.log(this.emailList)
    this.notAvailable=this.emailList.find(lid=>email.value === lid)
    console.log(this.notAvailable)
    
    if (this.notAvailable){
      return ("This is not available")
      
    }
    else{
      return ("Available")
    }
    
  }
}
