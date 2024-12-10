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
import { Mfa } from '../../../models/mfa.model';

@Component({
  selector: 'app-mfa',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatProgressSpinnerModule, MatIconModule, NgIf],
  templateUrl: './mfa.component.html',
  styleUrl: './mfa.component.scss'
})
export class MfaComponent implements OnInit {

  readonly _snackBar = inject(MatSnackBar);
  readonly sanitizer = inject(DomSanitizer);
  public formGroup: FormGroup;

  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly authService: AuthService,
    readonly sessionService: SessionService){
    this.formGroup = this.fb.group({
      name: [''],
      username: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let token = this.sessionService.getTokenDecoder();
    if(token){
      this.formGroup.get('name')?.setValue(token.name);
      this.formGroup.get('username')?.setValue(token.preferred_username);
    }
  }

  public verificar(): void {
    if(this.formGroup.valid) {
      let usuario = new Mfa();
        usuario.setUsername = this.formGroup.get('username')?.value;
        usuario.setOtp =  this.formGroup.get('otp')?.value;

        this.authService.verifyOtp(usuario)
        .subscribe({ next: value => {
          console.log(value);
          this.router.navigate(['portal']);
        }, error: err => {
          console.log(err);
          if(err.error.mensaje) {
            this.formGroup.get('otp')?.setErrors({invalid: true, message: err.error.mensaje});
            this.openSnackBar(err.error.mensaje, '✗', 'error-snackbar');
          } else {
            this.formGroup.get('otp')?.setErrors({invalid: true, message: err.message});
            this.openSnackBar(err.message, '✗', 'error-snackbar');
          }
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
