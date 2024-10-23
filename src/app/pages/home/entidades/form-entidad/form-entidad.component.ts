import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location, NgFor } from "@angular/common";
import { EntidadService } from '../../../../services/entidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Documento } from '../../../../interfaces/documento.interface';
import { Entidad } from '../../../../models/entidad.model';

@Component({
  selector: 'app-form-entidad',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule, NgFor
  ],
  templateUrl: './form-entidad.component.html',
  styleUrl: './form-entidad.component.scss'
})
export class FormEntidadComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  public documentos: Documento[];
  public formGroup: FormGroup;
  titulo: string;
  buttonTitle: string;
  constructor(readonly fb: FormBuilder, 
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly entidadService: EntidadService){
    let params = this.route.snapshot.params;
    console.log(params);
    if(params['idEntidad'] != null){
      this.titulo = 'Editar Entidad' 
      this.buttonTitle = 'Actualizar';
    } else{
      this.titulo = 'Nueva Entidad';
      this.buttonTitle = 'Registrar';
    }

    this.formGroup = this.fb.group({
      idEntidad: [params['idEntidad'] != null ? params['idEntidad'] : 0],
      idDocumento: [params['idDocumento'] != null ? params['idDocumento'] : '', Validators.required],
      numeroDocumento: [params['numeroDocumento'] != null ? params['numeroDocumento'] : '', Validators.required],
      nombre: [params['nombre'] != null ? params['nombre'] : '', Validators.required],
      sigla: [params['sigla'] != null ? params['sigla'] : '', Validators.required],
      codExterno: [params['codExterno'] != null ? params['codExterno'] : '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  getTiposDocumentos(){
    this.entidadService.obtenerDocumentos()
    .subscribe({
      next: res => {
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
      let data = new Entidad();
      data.setIdDocumento = this.formGroup.get('idDocumento')?.value; 
      data.setNumeroDocumento = this.formGroup.get('numeroDocumento')?.value; 
      data.setNombre = this.formGroup.get('nombre')?.value; 
      data.setSigla = this.formGroup.get('sigla')?.value; 
      data.setCodExterno = this.formGroup.get('codExterno')?.value; 
      if(this.formGroup.get('idEntidad')?.value == 0){
        this.insert(data);
      } else {
        data.setIdentidad = this.formGroup.get('idEntidad')?.value; 
        this.update(data);
      }
    }
  }

  private insert(data: Entidad) {
    this.entidadService.create(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        // this.location.back();
        this.router.navigateByUrl('/home/entidades');
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });
  }

  private update(data: Entidad) {
    this.entidadService.update(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        // this.location.back();
        this.router.navigateByUrl('/home/entidades');
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });
  }

  cancel() {
    this.location.back();
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

}
