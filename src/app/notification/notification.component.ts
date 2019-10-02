import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar() {
    this._snackBar.openFromComponent(NotificationContainerComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'notification-container-component',
  templateUrl: 'notification-container.component.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class NotificationContainerComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log('dados');
    console.log(data);
  }
}
