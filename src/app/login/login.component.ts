import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/authGuard/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;

  constructor(
    private notificationService: NotificationService,
    private loginService: LoginService,
    private router: Router,
    private authGuardService: AuthGuardService
  ) {
    if(this.authGuardService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  async login() {
    if(this.email && this.password) {
      const result = await this.loginService.login(this.email, this.password);
      if (result) {
        this.router.navigate(['/']);
      } else {
        this.notificationService.notification$.next({
          type: 'error',
          message: 'Erro ao realizar o login. Tente novamente!'
        });
      }
    } else {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Insira o e-mail e a senha!'
      });
    }
  }

}
