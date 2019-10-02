import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private db: AngularFirestore,
    private notificationService: NotificationService
  ) { }

  async getCategories() {
    try {
      let categories = [];
      const categoriesPromise = await this.db.collection('categories').get().toPromise();
      categoriesPromise.docs.forEach(async categoryPromise => {
        categories.push(categoryPromise.data())
      });
      return categories;
    } catch {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao listas categorias!'
      });
      console.log('error');
    }
  }
}
