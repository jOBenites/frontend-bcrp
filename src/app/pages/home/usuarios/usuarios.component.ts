import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Entidad } from '../../../models/entidad.model';
import { DialogConfirmationComponent } from '../../../components/dialog-confirmation/dialog-confirmation.component';
import { Sistema } from '../../../models/sistema.model';
import { SistemaService } from '../../../services/sistema.service';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role.model';
import { EntidadService } from '../../../services/entidad.service';
import { Documento } from '../../../interfaces/documento.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, NgFor],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

readonly _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
public documentos: Documento[];
public sistemas: Sistema[];
displayedColumns: string[] = ['numero', 'ambito', 'numDoc', 'estado', 'nombre', 'apePaterno', 'apeMaterno', 'correo', 'action'];
dataSource: Usuario[] = [];
resultsLength = 0;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly entidadService: EntidadService,
    readonly sistemaService: SistemaService,
    readonly usuarioService: UsuarioService){
    this.formGroup = this.fb.group({
      idDocumento: [''],
      numeroDocumento: [''],
      ambito: [''],
      idSistema: [''],
      nombres: ['']
    });
  }

  ngAfterViewInit() {
   this.getTiposDocumentos();
   this.getSistemas();
   this.getListado();
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

  getListado() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.usuarioService.readPaginate(
            this.paginator.pageIndex,  
            this.paginator.pageSize, 
            this.sort.active,
            this.sort.direction,
            this.formGroup.get('idSistema')?.value,
            this.formGroup.get('idDocumento')?.value,
            this.formGroup.get('numeroDocumento')?.value,
            this.formGroup.get('ambito')?.value,
            this.formGroup.get('nombres')?.value)
          .pipe(catchError(() => of(null)));
        }),
        map(data => {
          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalElements;
          return data.content;
        }),
      )
      .subscribe(data => (this.dataSource = data));
  }

  clean(): void {
    this.formGroup.get('idSistema')?.setValue('');
    this.formGroup.get('idDocumento')?.setValue('');
    this.formGroup.get('nombres')?.setValue('');
    this.formGroup.get('numeroDocumento')?.setValue('');
    this.formGroup.get('ambito')?.setValue('');
  }

  search(): void {
    this.getListado();
  }

  edit(data: Entidad) {
    this.router.navigate(['home/usuarios/nuevo-usuario', data]);
  }

  delete(data: any) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: {title: 'Eliminar Usuario', message: '¿Está seguro de eliminar el usuario?'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.usuarioService.delete(data.idUsuario)
          .subscribe({
            next: res => {
            console.log(res);
            this.openSnackBar(res.message, '✓', 'success-snackbar');
            this.getListado();
          },
          error: err => {
            console.log(err);
            this.openSnackBar(err.message, '✗', 'error-snackbar');
          }
        });
      }
    });
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

}
