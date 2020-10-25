import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string = 'http://localhost:4000/api/user';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/`)
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user)
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
