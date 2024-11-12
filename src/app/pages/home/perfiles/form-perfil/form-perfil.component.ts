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
import { Perfil } from '../../../../models/perfil.model';
import { PerfilService } from '../../../../services/perfil.service';
import { RoleService } from '../../../../services/role.service';
import { Role } from '../../../../models/role.model';

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
  public entidades: Entidad[];
  public roles: Role[];
  titulo: string;
  buttonTitle: string;
  constructor(readonly fb: FormBuilder, 
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly sistemaService: SistemaService,
    readonly entidadService: EntidadService,
    readonly roleService: RoleService,
    readonly perfilService: PerfilService){
    let params = this.route.snapshot.params;
    console.log(params);
    if(params['idPerfil'] != null) {
      this.titulo = 'Editar Perfil' 
      this.buttonTitle = 'Actualizar';
    } else {
      this.titulo = 'Nuevo Perfil';
      this.buttonTitle = 'Registrar';
    }

    this.formGroup = this.fb.group({
      idPerfil: [params['idPerfil'] != null ? params['idPerfil'] : 0],
      idSistema: [params['idSistema'] != null ? params['idSistema'] : '', Validators.required],
      idEntidad: [params['idEntidad'] != null ? params['idEntidad'] : '', Validators.required],
      idRol: [params['idRol'] != null ? params['idRol'] : '', Validators.required],
      nombre: [params['nombrePerfil'] != null ? params['nombrePerfil'] : '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSistemas();
    this.getEntidad();
    this.getRol();
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

  getEntidad(){
    this.entidadService.readAll()
    .subscribe({
      next: res => {
        console.log(res);
        this.entidades = res.content;
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    })
  }

  getRol(){
    this.roleService.readAll()
    .subscribe({
      next: res => {
        console.log(res);
        this.roles = res.content;
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    })
  }

  save() {
    console.log('save');
    if(this.formGroup.valid) {
      let data = new Perfil();
      data.setIdSistema = this.formGroup.get('idSistema')?.value; 
      data.setIdEntidad = this.formGroup.get('idEntidad')?.value; 
      data.setIdRol = this.formGroup.get('idRol')?.value; 
      data.setNombrePerfil = this.formGroup.get('nombre')?.value; 
      if(this.formGroup.get('idPerfil')?.value == 0){
        this.insert(data);
      } else {
        data.setIdPerfil = this.formGroup.get('idPerfil')?.value; 
        this.update(data);
      }
    }
  }

  private insert(data: Perfil) {
    this.perfilService.create(data)
    .subscribe({
      next: res => {
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.router.navigateByUrl('/home/perfiles');
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

  private update(data: Perfil) {
    this.perfilService.update(data)
    .subscribe({
      next: res => {
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.router.navigateByUrl('/home/perfiles');
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
