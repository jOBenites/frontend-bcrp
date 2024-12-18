import { NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { ICaptcha } from '../../../interfaces/captcha.interface';
import { Auth } from '../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatProgressSpinnerModule, MatIconModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements AfterViewInit {
  readonly _snackBar = inject(MatSnackBar);
  readonly sanitizer = inject(DomSanitizer);
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

    this.captcha = {captchaImage: '', hiddenCaptcha: '', tokenUuid: ''};
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showCaptcha()
    });
  }

  public login(): void {
    if(this.formGroup.valid) {
      let usuario = new Auth();
        usuario.setUsuario = this.formGroup.get('user')?.value;
        usuario.setPassword = this.formGroup.get('password')?.value;
        usuario.setCaptcha = this.formGroup.get('captchaText')?.value;
        usuario.setHiddenCaptcha = this.captcha.hiddenCaptcha;
        usuario.setTokenUuid = this.captcha.tokenUuid;

        this.authService.signIn(usuario)
        .subscribe({ next: value => {
          this.sessionService.setUser(value.name);
          this.sessionService.setToken(value.access_token);
          this.sessionService.setRefreshToken(value.refresh_token);
          this.router.navigate(['login/mfa']);
        }, error: err => {
          console.log(err);
          this.showCaptcha();
          this.formGroup.get('captchaText')?.setErrors({invalid: true, message: err.error.mensaje})
          this.openSnackBar(err.error.mensaje, '✗', 'error-snackbar');
        } });
        
    }
  }

  showCaptcha(){
    this.authService.getCaptcha()
    .subscribe({ next: value => {
        let captchaBase64 = value.captchaImage;
        this.captcha = {
          captchaImage: 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(captchaBase64) as any).changingThisBreaksApplicationSecurity,
          hiddenCaptcha: value.hiddenCaptcha,
          tokenUuid: value.tokenUuid
        }
      }, error: err => {
        console.log(err);
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
