import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerObserverService {
  readonly subject = new BehaviorSubject<any>(false);
  constructor() {
    console.log("Inicio SpinnerObserverService")
  }

  showSpinner(): void {
    this.subject.next(true);
  }

  hideSpinner(): void {
    this.subject.next(false);
  }

  public getStateSpinner(): Observable<any> {
    return this.subject.asObservable();
  }
}
