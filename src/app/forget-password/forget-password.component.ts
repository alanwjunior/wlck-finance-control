import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationService } from '../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  email;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async sendPassword() {
    if(this.email) {
      try {
        const result = this.firebaseAuth.auth.sendPasswordResetEmail(this.email, {
          url: 'https://wlck-finance-control.firebaseapp.com/login'
        });
        this.notificationService.notification$.next({
          type: 'success',
          message: 'E-mail de reset de senha enviado!'
        });
        this.router.navigate(['/login']);
      } catch(e) {
        this.notificationService.notification$.next({
          type: 'error',
          message: 'Erro ao enviar e-mail!'
        });
      }
    } else {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o campo de e-mail!'
      });
    }
  }

}
