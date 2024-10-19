import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from "@angular/common";
import { SistemaService } from '../../../../services/sistema.service';
import { Sistema } from '../../../../models/sistema.model';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-sistema',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './form-sistema.component.html',
  styleUrl: './form-sistema.component.scss'
})
export class FormSistemaComponent {
  private _snackBar = inject(MatSnackBar);
  public formGroup: FormGroup;
  titulo: string;
  buttonTitle: string;
  constructor(readonly fb: FormBuilder, 
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly sistemaService: SistemaService){
      let params = this.route.snapshot.params;

      if(params['idSistema'] != null){
        this.titulo = 'Editar Sistema' 
        this.buttonTitle = 'Actualizar';
      } else{
        this.titulo = 'Nuevo sistema';
        this.buttonTitle = 'Registrar';
      }

      this.formGroup = this.fb.group({
        idSistema: [params['idSistema'] != null ? params['idSistema'] : 0],
        codigo: [params['codigo'] != null ? params['codigo'] : ''],
        sistema: [params['nombre'] != null ? params['nombre'] : '', Validators.required],
        version: [params['version'] != null ? params['version'] : '', Validators.required],
        url: [params['url'] != null ? params['url'] : '', Validators.required],
        logoHead: [params['logoHead'] != null ? params['logoHead'] : ''],
        logoMain: [params['logoMain'] != null ? params['logoMain'] : '']
      });
  }

  // cancel() {
  //   this.location.back();
  // }

  save() {
    if(this.formGroup.valid) {

      let formData = new FormData();
      formData.append("codigo", this.formGroup.get('codigo')?.value);
      formData.append("nombre", this.formGroup.get('sistema')?.value);
      formData.append("version", this.formGroup.get('version')?.value);
      formData.append("url", this.formGroup.get('url')?.value);

      let fileLogoHead = this.formGroup.get('logoHead')?.value;
      if (fileLogoHead instanceof File) {
        formData.append('imageLogoHead', fileLogoHead, fileLogoHead.name);
      }
      let fileLogoMain = this.formGroup.get('logoMain')?.value;
      if (fileLogoMain instanceof File) {
        formData.append('imageLogoMain', fileLogoMain, fileLogoMain.name);
      }

      if(this.formGroup.get('idSistema')?.value == 0){
        this.insert(formData);
      } else {
        formData.append("id", this.formGroup.get('idSistema')?.value);
        this.update(formData);
      }
    }
  }

  private insert(data: FormData) {
    this.sistemaService.create(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.location.back();
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });
  }

  private update(data: FormData) {
    this.sistemaService.update(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.location.back();
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });
  }

  onFileChanged(event: any): void {
   if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        logoHead: file,
      });
    }
  }

  onFileChangedTwo(event: any): void {
   if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        logoMain: file,
      });
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
