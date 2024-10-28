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
import { SistemaService } from '../../../../services/sistema.service';
import { Sistema } from '../../../../models/sistema.model';

@Component({
  selector: 'app-form-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule, NgFor
  ],
  templateUrl: './form-perfil.component.html',
  styleUrl: './form-perfil.component.scss'
})
export class FormPerfilComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);
  public documentos: Documento[];
  public formGroup: FormGroup;
  public sistemas: Sistema[];
  titulo: string;
  buttonTitle: string;
  constructor(readonly fb: FormBuilder, 
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly sistemaService: SistemaService){
    let params = this.route.snapshot.params;
    console.log(params);
    if(params['idEntidad'] != null){
      this.titulo = 'Editar Perfil' 
      this.buttonTitle = 'Actualizar';
    } else{
      this.titulo = 'Nuevo Perfil';
      this.buttonTitle = 'Registrar';
    }

    this.formGroup = this.fb.group({
      idPerfil: [0],
      idSistema: ['', Validators.required],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSistemas();
    // this.formGroup.controls['codExterno'].disable();
  }

  getSistemas(){
    this.sistemaService.readAll()
    .subscribe({
      next: res => {
        console.log(res);
        this.sistemas = res.content;
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
    /*this.entidadService.create(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.router.navigateByUrl('/home/entidades');
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });*/
  }

  private update(data: Entidad) {
    /*this.entidadService.update(data)
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
    });*/
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
