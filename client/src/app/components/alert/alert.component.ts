import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
      .subscribe(msg => {
        switch (msg && msg.type) {
          case 'success':
            msg.cssClass = 'alert alert-success'
            break;
          case 'error':
            msg.cssClass = 'alert alert-error'
            break;
        }

        this.message = msg;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
