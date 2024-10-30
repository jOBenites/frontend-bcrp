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
import { Role } from '../../../../models/role.model';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-form-role',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule, NgFor
  ],
  templateUrl: './form-role.component.html',
  styleUrl: './form-role.component.scss'
})
export class FormRoleComponent implements OnInit {

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
    readonly sistemaService: SistemaService,
    readonly roleService: RoleService){
    let params = this.route.snapshot.params;
    console.log(params);
    if(params['idRol'] != null){
      this.titulo = 'Editar Rol' 
      this.buttonTitle = 'Actualizar';
    } else {
      this.titulo = 'Nuevo Rol';
      this.buttonTitle = 'Registrar';
    }

    this.formGroup = this.fb.group({
      idRol: [params['idRol'] != null ? params['idRol'] : 0],
      idSistema: [params['idSistema'] != null ? params['idSistema'] : '', Validators.required],
      nombre: [params['nombreRol'] != null ? params['nombreRol'] : '', Validators.required]
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
      let data = new Role();
      data.setIdSistema = this.formGroup.get('idSistema')?.value; 
      data.setNombreRol = this.formGroup.get('nombre')?.value; 
      if(this.formGroup.get('idRol')?.value == 0){
        this.insert(data);
      } else {
        data.setIdRol = this.formGroup.get('idRol')?.value; 
        this.update(data);
      }
    }
  }

  private insert(data: Role) {
    this.roleService.create(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.router.navigateByUrl('/home/roles');
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });
  }

  private update(data: Role) {
    this.roleService.update(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        // this.location.back();
        this.router.navigateByUrl('/home/roles');
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

