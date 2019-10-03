import { Component } from '@angular/core';
import { NotificationService } from './services/notification/notification.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationContainerComponent } from './notification/notification.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wlck-finance-control';

  durationInSeconds = 5;

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
      
      // Notification Service configuration
      this.notificationService.notification$.subscribe((data) => {
        
        const snackBarConfig = new MatSnackBarConfig();
        snackBarConfig.data = {
          type: data.type,
          message: data.message
        };
        snackBarConfig.duration = 5000;
        switch(data.type) {
          case 'success': snackBarConfig.panelClass = 'app-notification-success'; break;
          case 'error': snackBarConfig.panelClass = 'app-notification-error'; break;
          default: snackBarConfig.panelClass = 'app-notification-warning';
        }
        this.snackBar.openFromComponent(NotificationContainerComponent, snackBarConfig);
      });
  }

  isLoginPage() {
    return this.router.url.indexOf('login') !== -1;
  }
}
