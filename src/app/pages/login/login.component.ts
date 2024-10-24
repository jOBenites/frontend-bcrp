import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PipesModule } from '../../pipes/pipes.module';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { SessionService } from '../../services/session.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PipesModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly _snackBar = inject(MatSnackBar);
  public showSpinner: boolean = false;
  public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly authService: AuthService,
    readonly sessionService: SessionService){
    this.formGroup = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    if(this.formGroup.valid) {
      this.showSpinner = true;
      let usuario = new Usuario();
        usuario.setUsuario = this.formGroup.get('user')?.value;
        usuario.setPassword = this.formGroup.get('password')?.value;

    this.authService.signIn(usuario)
      .subscribe({ next: value => {
        this.showSpinner = false;
        this.sessionService.setUser(value.nombre);
        this.sessionService.setToken(value.token);
        this.sessionService.setRefreshToken(value.refreshToken);
        this.router.navigate(['portal']);
      }, error: err => {
        this.showSpinner = false;
        console.log(err);
        this.openSnackBar(err.error.mensaje, '✗', 'error-snackbar');
      } });
    }
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

}
