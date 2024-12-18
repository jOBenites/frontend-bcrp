import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Location, NgFor } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Documento } from '../../../../interfaces/documento.interface';
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
    MatButtonModule, MatRadioModule, NgFor
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
    let params: ParamMap = this.route.snapshot.paramMap;
            let obj:any = {};
            params.keys.forEach(element => {
              obj[element] = params.get(element);
            });
    let model: Opcion = Object.assign(new Opcion(), obj);
    if(model.optionId != null){
      this.titulo = 'Editar Opción' 
      this.buttonTitle = 'Actualizar';
    } else{
      this.titulo = 'Nueva Opción';
      this.buttonTitle = 'Registrar';
    }

    this.formGroup = this.fb.group({
      idOpcion: [model.optionId != null ? model.optionId : 0],
      idSistema: [model.systemId != null ? model.systemId : '', Validators.required],
      idModulo: [model.moduleId != null ? model.moduleId : '', Validators.required],
      nombre: [model.optionName != null ? model.optionName : '', Validators.required],
      link: [model.url!= null ? model.url : ''],
      estado: [model.state != null ? model.state : 1, Validators.required]
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
      data.setEstado = this.formGroup.get('estado')?.value;
      
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
        if(err.error.message) {
          this.openSnackBar(err.error.message, '✗', 'error-snackbar');
        } else {
          this.openSnackBar(err.message, '✗', 'error-snackbar');
        }
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
