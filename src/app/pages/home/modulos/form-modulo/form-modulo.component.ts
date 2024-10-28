import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location, NgFor } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Documento } from '../../../../interfaces/documento.interface';
import { Entidad } from '../../../../models/entidad.model';
import { SistemaService } from '../../../../services/sistema.service';
import { Sistema } from '../../../../models/sistema.model';
import { ModuloService } from '../../../../services/modulo.service';
import { Modulo } from '../../../../models/modulo.model';

@Component({
  selector: 'app-form-modulo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule, NgFor
  ],
  templateUrl: './form-modulo.component.html',
  styleUrl: './form-modulo.component.scss'
})
export class FormModuloComponent implements OnInit {

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
    readonly moduloService: ModuloService){
    let params = this.route.snapshot.params;
    console.log(params);
    if(params['idModulo'] != null){
      this.titulo = 'Editar Módulo' 
      this.buttonTitle = 'Actualizar';
    } else{
      this.titulo = 'Nuevo Módulo';
      this.buttonTitle = 'Registrar';
    }

    let idModulo = params['idModulo'] != null ? params['idModulo'] : 0;
    let idSistema = params['idSistema'] != null ? params['idSistema'] : '';
    let nombre = params['nombreModulo'] != null ? params['nombreModulo'] : '';
    this.formGroup = this.fb.group({
      idModulo: [idModulo],
      idSistema: [idSistema, Validators.required],
      nombre: [nombre, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSistemas();
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
      let data = new Modulo();
      data.setIdSistema = this.formGroup.get('idSistema')?.value; 
      data.setNombreModulo = this.formGroup.get('nombre')?.value; 
      console.log(data);
      if(this.formGroup.get('idModulo')?.value == 0){
        this.insert(data);
      } else {
        data.setIdModulo = this.formGroup.get('idModulo')?.value; 
        this.update(data);
      }
    }
  }

  private insert(data: Modulo) {
    this.moduloService.create(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.router.navigateByUrl('/home/modulos');
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });
  }

  private update(data: Modulo) {
    this.moduloService.update(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        // this.location.back();
        this.router.navigateByUrl('/home/modulos');
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
