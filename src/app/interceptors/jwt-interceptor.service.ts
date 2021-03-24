import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private auth : AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // mount the token on each request
    if(this.auth.isUserLoggedIn()){
      console.log("authorization header being put");
      let authenticationToken = this.auth.getAuthenticationToken();      
      // request = request.clone(<changes>);
      request = request.clone({
        setHeaders : {
          Authorization : authenticationToken
        }
      });
    }

    // pass it to original/next location
    return next.handle(request);

  }
}
