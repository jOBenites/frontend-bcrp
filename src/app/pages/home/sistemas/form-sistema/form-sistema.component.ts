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
import { RouterModule, ActivatedRoute, ParamMap} from '@angular/router';
import { Persona } from '../../../../interfaces/persona.interface';
import { Estado } from '../../../../interfaces/estado.interface';
import { MatRadioModule } from '@angular/material/radio';
import { Sistema } from '../../../../models/sistema.model';

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
    let params: ParamMap = this.route.snapshot.paramMap;
    let obj:any = {};
    params.keys.forEach(element => {
      obj[element] = params.get(element);
    });
    let model: Sistema = Object.assign(new Sistema(), obj);
      if(model.idSystem != null){
        this.titulo = 'Editar Sistema' 
        this.buttonTitle = 'Actualizar';
        this.responsableMain = model.userResponsible;
        this.responsableAlt = model.userResponsibleAlternate;
      } else {
        this.titulo = 'Nuevo sistema';
        this.buttonTitle = 'Registrar';
      }

      this.formGroup = this.fb.group({
        idSistema: [model.idSystem != null ? model.idSystem : 0],
        // codigo: [params['codigo'] != null ? params['codigo'] : ''],
        sistema: [model.name != null ? model.name : '', Validators.required],
        version: [model.version != null ? model.version : '', Validators.required],
        url: [model.url != null ? model.url : '', Validators.required],
        urlExterno: [model.urlExternal != null ? model.urlExternal : '', Validators.required],
        logoHead: [model.logoHead != null ? model.logoHead : '', Validators.required],
        logoMain: [model.logoMain != null ? model.logoMain : '', Validators.required],
        usuarioResponsable: [model.idUserResponsible != null ? model.idUserResponsible : '', Validators.required],
        usuarioResponsableAlt: [model.idUserResponsibleAlternate != null ? model.idUserResponsibleAlternate : '', Validators.required],
        idEstadoCritico: [model.idStateCritical != null ? model.idStateCritical : '', Validators.required],
        unidOrganizacional: [model.unitOrganizational != null ? model.unitOrganizational : '', Validators.required],
        estado: [model.estate != null ? model.estate : '1', Validators.required]
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
      formData.append("name", this.formGroup.get('sistema')?.value);
      formData.append("version", this.formGroup.get('version')?.value);
      formData.append("url", this.formGroup.get('url')?.value);
      formData.append("urlExternal", this.formGroup.get('urlExterno')?.value);
      formData.append("idUserResponsible", this.formGroup.get('usuarioResponsable')?.value);
      formData.append("idUserResponsibleAlternate", this.formGroup.get('usuarioResponsableAlt')?.value);
      formData.append("userResponsible", this.responsableMain);
      formData.append("userResponsibleAlternate", this.responsableAlt);
      formData.append("idStateCritical", this.formGroup.get('idEstadoCritico')?.value);
      formData.append("unitOrganizational", this.formGroup.get('unidOrganizacional')?.value);
      formData.append("estate", this.formGroup.get('estado')?.value);

      let fileLogoHead = this.formGroup.get('logoHead')?.value;
      if (fileLogoHead instanceof File) {
        formData.append('logoHead', fileLogoHead, fileLogoHead.name);
      }
      let fileLogoMain = this.formGroup.get('logoMain')?.value;
      if (fileLogoMain instanceof File) {
        formData.append('logoMain', fileLogoMain, fileLogoMain.name);
      }

      if(this.formGroup.get('idSistema')?.value == 0){
        this.insert(formData);
      } else {
        formData.append("idSystem", this.formGroup.get('idSistema')?.value);
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
