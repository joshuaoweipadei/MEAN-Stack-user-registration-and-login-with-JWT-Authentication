import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticateService } from '../services/authenticate.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticateService: AuthenticateService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticateService.currentUserValue;
    if(currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: currentUser.token
        }
      })
    }
    return next.handle(request);
  }
}
