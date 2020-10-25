import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  apiUrl:string = 'http://localhost:4000/api/user';

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('authUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { email, password })
      .pipe(map(user => {
        console.log(user)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('authUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('authUser');
    this.currentUserSubject.next(null);
  }
}
