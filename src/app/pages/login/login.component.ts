import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '../../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { SpinnerObserverService } from '../../services/spinner-observer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, PipesModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  public showSpinner: boolean = false;
  private spinnerSubscription: Subscription;
  
  constructor(readonly spinnerObserver: SpinnerObserverService){}

  ngOnInit(): void {
    this.spinnerSubscription = this.spinnerObserver.getStateSpinner().subscribe((value: boolean) => {
      this.showSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }

}
