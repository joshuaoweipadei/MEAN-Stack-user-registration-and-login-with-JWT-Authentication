import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users:any = [];

  constructor(
    private authenticateService: AuthenticateService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticateService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadAllUsers()
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers())
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users)
  }

}
