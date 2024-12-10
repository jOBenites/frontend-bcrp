import { AfterViewInit, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location, NgFor } from "@angular/common";
import { SistemaService } from '../../../../services/sistema.service';
import { RouterModule, ActivatedRoute} from '@angular/router';
import { Persona } from '../../../../interfaces/persona.interface';
import { Estado } from '../../../../interfaces/estado.interface';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-form-sistema',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, 
    MatButtonModule, MatIconModule, MatRadioModule, NgFor],
  templateUrl: './form-sistema.component.html',
  styleUrl: './form-sistema.component.scss'
})
export class FormSistemaComponent implements AfterViewInit {
  private _snackBar = inject(MatSnackBar);
  public formGroup: FormGroup;
  titulo: string;
  buttonTitle: string;
  responsables: Persona[] = [];
  eclasistidad: Estado[] = [];
  private responsableMain: string = '';
  private responsableAlt: string = '';
  constructor(readonly fb: FormBuilder, 
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly sistemaService: SistemaService){
      let params = this.route.snapshot.params;
      console.log(params);
      if(params['idSistema'] != null){
        this.titulo = 'Editar Sistema' 
        this.buttonTitle = 'Actualizar';
        this.responsableMain = params['usuarioResponsable'];
        this.responsableAlt = params['usuarioResponsableAlterno'];
      } else {
        this.titulo = 'Nuevo sistema';
        this.buttonTitle = 'Registrar';
      }

      this.formGroup = this.fb.group({
        idSistema: [params['idSistema'] != null ? params['idSistema'] : 0],
        // codigo: [params['codigo'] != null ? params['codigo'] : ''],
        sistema: [params['nombre'] != null ? params['nombre'] : '', Validators.required],
        version: [params['version'] != null ? params['version'] : '', Validators.required],
        url: [params['url'] != null ? params['url'] : '', Validators.required],
        urlExterno: [params['urlExterno'] != null ? params['urlExterno'] : '', Validators.required],
        logoHead: [params['logoHead'] != null ? params['logoHead'] : '', Validators.required],
        logoMain: [params['logoMain'] != null ? params['logoMain'] : '', Validators.required],
        usuarioResponsable: [params['idUsuarioResponsable'] != null ? params['idUsuarioResponsable'] : '', Validators.required],
        usuarioResponsableAlt: [params['idUsuarioResponsableAlterno'] != null ? params['idUsuarioResponsableAlterno'] : '', Validators.required],
        idEstadoCritico: [params['idEstadoCritico'] != null ? params['idEstadoCritico'] : '', Validators.required],
        unidOrganizacional: [params['unidadOrganizacional'] != null ? params['unidadOrganizacional'] : '', Validators.required],
        estado: [params['estado'] != null ? params['estado'] : '1', Validators.required]
      });
  }

  ngAfterViewInit(): void {
    this.getResponsables();
    this.getEclasistidad();
  }

  getResponsables(){
    this.sistemaService.obtenerResponsables()
    .subscribe({
      next: res => {
        this.responsables = res;
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    })
  }

  getEclasistidad(){
    this.sistemaService.obtenerEstados()
    .subscribe({
      next: res => {
        console.log(res);
        this.eclasistidad = res;
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    })
  }

  save() {
    if(this.formGroup.valid) {

      let formData = new FormData();
      // formData.append("codigo", this.formGroup.get('codigo')?.value);
      formData.append("nombre", this.formGroup.get('sistema')?.value);
      formData.append("version", this.formGroup.get('version')?.value);
      formData.append("url", this.formGroup.get('url')?.value);
      formData.append("urlExterno", this.formGroup.get('urlExterno')?.value);
      formData.append("idUsuarioResponsable", this.formGroup.get('usuarioResponsable')?.value);
      formData.append("idUsuarioResponsableAlt", this.formGroup.get('usuarioResponsableAlt')?.value);
      formData.append("usuarioResponsable", this.responsableMain);
      formData.append("usuarioResponsableAlt", this.responsableAlt);
      formData.append("idEstadoCritico", this.formGroup.get('idEstadoCritico')?.value);
      formData.append("unidOrganizacional", this.formGroup.get('unidOrganizacional')?.value);
      formData.append("estado", this.formGroup.get('estado')?.value);

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
        formData.append("idSistema", this.formGroup.get('idSistema')?.value);
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
        if(err.error.message) {
          this.openSnackBar(err.error.message, '✗', 'error-snackbar');
        } else {
          this.openSnackBar(err.message, '✗', 'error-snackbar');
        }
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
        if(err.error.message) {
          this.openSnackBar(err.error.message, '✗', 'error-snackbar');
        } else {
          this.openSnackBar(err.message, '✗', 'error-snackbar');
        }
      }
    });
  }

  selectedValue(event: MatSelectChange) {
    this.responsableMain = event.source.triggerValue;
  }
  selectedValueAlt(event: MatSelectChange) {
    this.responsableAlt = event.source.triggerValue;
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
