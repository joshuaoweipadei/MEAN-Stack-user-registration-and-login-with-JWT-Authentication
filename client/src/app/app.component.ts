import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticateService } from './services/authenticate.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticateServices: AuthenticateService
  ) {
    this.authenticateServices.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticateServices.logout();
    this.router.navigate(['/login']);
  }

}
