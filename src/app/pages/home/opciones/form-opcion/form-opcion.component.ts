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
import { ModuloService } from '../../../../services/modulo.service';
import { OpcionService } from '../../../../services/opcion.service';
import { Modulo } from '../../../../models/modulo.model';
import { Opcion } from '../../../../models/opcion.model';

@Component({
  selector: 'app-form-opcion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule, NgFor
  ],
  templateUrl: './form-opcion.component.html',
  styleUrl: './form-opcion.component.scss'
})
export class FormOpcionComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);
  public documentos: Documento[];
  public formGroup: FormGroup;
  public sistemas: Sistema[];
  public modulos: Modulo[];
  titulo: string;
  buttonTitle: string;
  constructor(readonly fb: FormBuilder, 
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly sistemaService: SistemaService,
    readonly moduleService: ModuloService,
    readonly opcionService: OpcionService){
    let params = this.route.snapshot.params;
    console.log(params);
    if(params['idEntidad'] != null){
      this.titulo = 'Editar Opción' 
      this.buttonTitle = 'Actualizar';
    } else{
      this.titulo = 'Nueva Opción';
      this.buttonTitle = 'Registrar';
    }

    this.formGroup = this.fb.group({
      idOpcion: [params['idOpcion'] != null ? params['idOpcion'] : 0],
      idSistema: [params['idSistema'] != null ? params['idSistema'] : '', Validators.required],
      idModulo: [params['idModulo'] != null ? params['idModulo'] : '', Validators.required],
      nombre: [params['nombreOpcion'] != null ? params['nombreOpcion'] : '', Validators.required],
      link: [params['url'] != null ? params['url'] : '']
    });
  }

  ngOnInit(): void {
    this.getSistemas();
    this.getModulos();
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

  getModulos(){
    this.moduleService.readAll()
    .subscribe({
      next: res => {
        console.log(res);
        this.modulos = res.content;
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    })
  }

  save() {
    if(this.formGroup.valid) {
      let data = new Opcion();
      data.setIdSistema = this.formGroup.get('idSistema')?.value; 
      data.setIdModulo = this.formGroup.get('idModulo')?.value; 
      data.setNombreModulo = this.formGroup.get('nombre')?.value;
      data.setUrl = this.formGroup.get('link')?.value; 
      if(this.formGroup.get('idOpcion')?.value == 0) {
        this.insert(data);
      } else {
        data.setIdOpcion = this.formGroup.get('idOpcion')?.value; 
        this.update(data);
      }
    }
  }

  private insert(data: Opcion) {
    this.opcionService.create(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        this.router.navigateByUrl('/home/opciones');
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.message, '✗', 'error-snackbar');
      }
    });
  }

  private update(data: Opcion) {
    this.opcionService.update(data)
    .subscribe({
      next: res => {
        console.log(res);
        this.openSnackBar(res.message, '✓', 'success-snackbar');
        // this.location.back();
        this.router.navigateByUrl('/home/opciones');
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
