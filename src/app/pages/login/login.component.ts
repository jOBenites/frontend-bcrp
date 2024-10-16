import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../../pipes/pipes.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PipesModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, readonly router: Router){
    this.formGroup = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  goToDashboard(): void{
    this.router.navigate(['portal']);
  }

}
