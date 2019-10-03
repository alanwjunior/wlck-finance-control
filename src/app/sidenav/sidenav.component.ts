import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() onCloseMenu: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  openDashboard() {
    this.onCloseMenu.emit();
    this.router.navigate(['/']);
  }

  openNewTransaction() {
    this.onCloseMenu.emit();
    this.router.navigate(['/add-incoming']);
  }

  openHistory() {
    this.onCloseMenu.emit();
    this.router.navigate(['/history']);
  }

  openMonthlyPlanning() {
    this.onCloseMenu.emit();
    this.router.navigate(['/monthly-planning']);
  }

  logout() {
    this.onCloseMenu.emit();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  closeMenu() {
    this.onCloseMenu.emit();
  }

}
