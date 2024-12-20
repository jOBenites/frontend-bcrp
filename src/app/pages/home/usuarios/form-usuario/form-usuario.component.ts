import { AfterViewInit, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location, NgFor } from "@angular/common";
import { RouterModule, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { EntidadService } from '../../../../services/entidad.service';
import { Documento } from '../../../../interfaces/documento.interface';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, MatIconModule, NgFor],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss'
})
export class FormUsuarioComponent implements AfterViewInit {
  private _snackBar = inject(MatSnackBar);
  public formGroup: FormGroup;
  titulo: string;
  buttonTitle: string;
  documentos: Documento[] = [];
  showSustento: boolean;
  constructor(readonly fb: FormBuilder, 
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly entidadService: EntidadService,
    readonly usuarioService: UsuarioService){
      let params: ParamMap = this.route.snapshot.paramMap;
      let obj:any = {};
      params.keys.forEach(element => {
        obj[element] = params.get(element);
      });
      let model: Usuario = Object.assign(new Usuario(), obj);
      if(model.userId != null){
        this.titulo = 'Editar Usuario' 
        this.buttonTitle = 'Actualizar';
        this.showSustento = false;
      } else {
        this.titulo = 'Nuevo Usuario';
        this.buttonTitle = 'Registrar';
        this.showSustento = true;
      }

      this.formGroup = this.fb.group({
        idUsuario: [model.userId != null ? model.userId : 0, Validators.required],
        tipoDocumento: [model.documentId != null ? model.documentId : '', Validators.required],
        numeroDocumento: [model.documentNumber != null ? model.documentNumber : '', Validators.required],
        nombres: [model.names != null ? model.names : '', Validators.required],
        apePaterno: [model.fatherSurname != null ? model.fatherSurname : '', Validators.required],
        apeMaterno: [model.motherSurname != null ? model.motherSurname : '', Validators.required],
        correoElectronico: [model.email != null ? model.email : '', Validators.required],
        ambito: [model.scope != null ? model.scope : '', Validators.required],
        sustento: ['', Validators.required]
      });
  }

  ngAfterViewInit(): void {
    this.getTiposDocumentos();
  }

  getTiposDocumentos(){
    this.usuarioService.obtenerDocumentos()
    .subscribe({
      next: res => {
        console.log(res);
        this.documentos = res;
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
      formData.append("tipoDocumento", this.formGroup.get('tipoDocumento')?.value);
      formData.append("numeroDocumento", this.formGroup.get('numeroDocumento')?.value);
      formData.append("nombres", this.formGroup.get('nombres')?.value);
      formData.append("apePaterno", this.formGroup.get('apePaterno')?.value);
      formData.append("apeMaterno", this.formGroup.get('apeMaterno')?.value);
      formData.append("correoElectronico", this.formGroup.get('correoElectronico')?.value);
      formData.append("ambito", this.formGroup.get('ambito')?.value);

      let fileSustento = this.formGroup.get('sustento')?.value;
      if (fileSustento instanceof File) {
        formData.append('sustento', fileSustento, fileSustento.name);
      }

      if(this.formGroup.get('idUsuario')?.value == 0) {
        this.insert(formData);
      } else {
        let data = new Usuario();
        data.setIdUsuario = this.formGroup.get('idUsuario')?.value;
        data.setTipoDocumento = this.formGroup.get('tipoDocumento')?.value;
        data.setNumeroDocumento = this.formGroup.get('numeroDocumento')?.value;
        data.setNombres = this.formGroup.get('nombres')?.value;
        data.setApePaterno = this.formGroup.get('apePaterno')?.value;
        data.setApeMaterno = this.formGroup.get('apeMaterno')?.value;
        data.setCorreoEletronico = this.formGroup.get('correoElectronico')?.value;
        data.setAmbito = this.formGroup.get('ambito')?.value;
        this.update(data);
      }
    }
  }

  private insert(data: FormData) {
    this.usuarioService.create(data)
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

  private update(data: Usuario) {
    this.usuarioService.update(data)
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

  onFileChanged(event: any): void {
   if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.patchValue({
        sustento: file,
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
