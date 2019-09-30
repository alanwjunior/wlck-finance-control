import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() onOpenMenu: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openRegisterIncoming() {
    this.router.navigate(['/add-incoming'])
  }

  openMenu() {
    console.log('open menu');
    this.onOpenMenu.emit();
  }
}
