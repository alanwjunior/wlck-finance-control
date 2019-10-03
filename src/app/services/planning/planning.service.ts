import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from '../notification/notification.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(
    private db: AngularFirestore,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) { }

  async listMonthlyPlanning() {
    try {
      const uid = this.loginService.getCurrentUser();
      let monthlyPlannings = [];
      const snapshot = await this.db.collection('monthly-planning')
        .ref
        .where('uid', '==', uid)
        .get();
      snapshot.docs.forEach(async planning => {
        monthlyPlannings.push(planning.data())
      });
      return monthlyPlannings;
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao listar planejamento mensais!'
      });
    }
  }

  async getMonthlyPlanning(year, month) {
    try {
      const uid = this.loginService.getCurrentUser();
      let monthlyPlanning = [];
      const snapshot = await this.db.collection('monthly-planning').ref
        .where('month', '==', month)
        .where('year', '==', year)
        .where('uid', '==', uid)
        .get();
      snapshot.docs.forEach(async planning => {
        monthlyPlanning.push(planning.data())
      });
      return monthlyPlanning;
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao buscar planejamento mensal!'
      });
    }
  }

  async saveMonthlyPlanning(monthlyPlanning) {
    try {
      const uid = this.loginService.getCurrentUser();
      monthlyPlanning.uid = uid;
      const snapshot = await this.db.collection('monthly-planning').ref
      .where('month', '==', monthlyPlanning.month)
      .where('year', '==', monthlyPlanning.year)
      .get();
      if(snapshot.size > 0) {
        snapshot.forEach(async doc => { 
          await this.updateMonthlyPlanning(doc.id, monthlyPlanning);
        });
      } else {
        this.addMonthlyPlanning(monthlyPlanning);
      }
      this.notificationService.notification$.next({
        type: 'success',
        message: 'Planejamento mensal salvo com sucesso!'
      });
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao salvar planejamento mensal!'
      });
    }
  }

  async updateMonthlyPlanning(monthlyPlanningId, monthlyPlanning) {
    try {
      const uid = this.loginService.getCurrentUser();
      monthlyPlanning.uid = uid;
      const result = await this.db.collection('monthly-planning').doc(monthlyPlanningId).update(monthlyPlanning);
      this.notificationService.notification$.next({
        type: 'success',
        message: 'Planejamento mensal atualizado com sucesso!'
      });
      return result;
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao atualizar planejamento mensal!'
      });
    }
  }

  async addMonthlyPlanning(monthlyPlanning) {
    try {
      const uid = this.loginService.getCurrentUser();
      monthlyPlanning.uid = uid;
      const collectionRef = await this.db.collection('monthly-planning').ref;
      const result = await collectionRef.add(monthlyPlanning);
      this.notificationService.notification$.next({
        type: 'success',
        message: 'Planejamento mensal adicionado com sucesso!'
      });
      return result;
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao adicionar planejamento mensal!'
      });
    }
  }
}
