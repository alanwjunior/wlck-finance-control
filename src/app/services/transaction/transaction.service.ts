import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from '../notification/notification.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private db: AngularFirestore,
    private notificationService: NotificationService,
    private loginService: LoginService
  ) { }

  async saveTransaction(transaction) {
    try {
      const uid = this.loginService.getCurrentUser();
      transaction.uid = uid;
      const transactionsRef = this.db.collection('transactions').ref;
      const result = await transactionsRef.add(transaction);
      this.notificationService.notification$.next({
        type: 'success',
        message: 'Transação salva com sucesso!'
      });
      return result;
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao salvar transação!'
      });
    }
  }

  async getTransactionsByPeriod(startDate, endDate) {
    try {
      const uid = this.loginService.getCurrentUser();
      let transactions = [];
      const snapshots = await this.db.collection('transactions').ref
        .where('date', '>=', startDate)
        .where('date', '<', endDate)
        .where('uid', '==', uid)
        .get();
      snapshots.docs.forEach(async transaction => {
        transactions.push(transaction.data())
      });
      return transactions;
    } catch (e) {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao buscar transações do período!'
      });
      console.log(e);
    }
  }
}
