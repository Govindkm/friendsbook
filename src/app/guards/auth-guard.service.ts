import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  authenticated:boolean|string;
  constructor(private router:Router, private authService:AuthenticationService) {
    this.authenticated=this.authService.isUserLoggedIn();
   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authenticated=this.authService.isUserLoggedIn();
    console.log("Auth Guard");
    console.log(this.authenticated);
    
    if(this.authenticated){
      this.router.navigate(['/home']);
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
