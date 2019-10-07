import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationService } from '../services/notification/notification.service';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  email;
  password;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async createUser() {
    if(this.email && this.password) {
      try {
        const result = await this.firebaseAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
        this.loginService.setUserInfo(result);
        this.router.navigate(['/']);
      } catch (e) {
        this.notificationService.notification$.next({
          type: 'error',
          message: 'Erro ao criar usuário!'
        });
      }
    } else {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o e-mail e senha!'
      });
    }
  }

}
