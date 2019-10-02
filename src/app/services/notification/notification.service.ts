import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notification$: Subject<{ type: string, message: string}> = new Subject<{ type: string, message: string}>();
  
  constructor() { }
}
