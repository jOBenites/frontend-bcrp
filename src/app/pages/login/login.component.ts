import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '../../pipes/pipes.module';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth.model';
import { SessionService } from '../../services/session.service';
import { NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ICaptcha } from '../../interfaces/captcha.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PipesModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatProgressSpinnerModule, MatIconModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  readonly _snackBar = inject(MatSnackBar);
  readonly sanitizer = inject(DomSanitizer);
  public showSpinner: boolean = false;
  public formGroup: FormGroup;
  public captcha: ICaptcha;
  public passwordVisible: boolean;
  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly authService: AuthService,
    readonly sessionService: SessionService){
    this.formGroup = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      captchaText: ['', Validators.required]
    });

    this.captcha = {captchaImage: '', hiddenCaptcha: ''};
  }

  ngOnInit(): void {
    this.showCaptcha();
  }

  public login(): void {
    if(this.formGroup.valid) {
      let usuario = new Auth();
        usuario.setUsuario = this.formGroup.get('user')?.value;
        usuario.setPassword = this.formGroup.get('password')?.value;
        usuario.setCaptcha = this.formGroup.get('captchaText')?.value;
        usuario.setHiddenCaptcha = this.captcha.hiddenCaptcha;

        if(usuario.captcha === usuario.hiddenCaptcha) {
          this.showSpinner = true;
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
        } else {
          this.formGroup.get('captchaText')?.setErrors({invalid: true, message: 'El texto ingresado es incorrecto'})
          this.openSnackBar('El texto ingresado es incorrecto', '✗', 'error-snackbar');
        }
    }
  }

  showCaptcha(){
    this.authService.getCaptcha()
    .subscribe({ next: value => {
        this.showSpinner = false;
        // console.log(value);
        let captchaBase64 = value.captchaImage;
        this.captcha = {
          captchaImage: 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(captchaBase64) as any).changingThisBreaksApplicationSecurity,
          hiddenCaptcha: value.hiddenCaptcha
        }
      }, error: err => {
        console.log(err);
        this.showSpinner = false;
        this.openSnackBar(err.error.mensaje, '✗', 'error-snackbar');
      } });
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

}
