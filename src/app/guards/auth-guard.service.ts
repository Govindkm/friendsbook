import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  authenticated:boolean;
  constructor(private router:Router) {
    this.authenticated=false;
   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
