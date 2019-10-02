import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private db: AngularFirestore,
    private notificationService: NotificationService
  ) { }

  async saveTransaction(transaction) {
    try {
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
      let transactions = [];
      const snapshots = await this.db.collection('transactions').ref
        .where('date', '>=', startDate)
        .where('date', '<', endDate)
        .get();
      snapshots.docs.forEach(async transaction => {
        transactions.push(transaction.data())
      });
      return transactions;
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao buscar transações do período!'
      });
    }
  }
}
