import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
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
import { DataSourceSistema } from '../../../interfaces/datasource-sistema.interface';

@Component({
  selector: 'app-opciones',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, NgFor],
  templateUrl: './opciones.component.html',
  styleUrl: './opciones.component.scss'
})
export class OpcionesComponent implements AfterViewInit {

readonly _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
public sistemas: Sistema[];
displayedColumns: string[] = ['numero', 'opcion', 'link', 'action'];
dataSource: Entidad[] = [];
resultsLength = 0;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly sistemaService: SistemaService){
    this.formGroup = this.fb.group({
      idSistema: [''],
      idModulo: ['']
    });
  }

  ngAfterViewInit() {
  //  this.getEntidad();
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

  /*getEntidad() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.entidadService.readPaginate(
            this.paginator.pageIndex,  
            this.paginator.pageSize, 
            this.sort.active,
            this.sort.direction,
            this.formGroup.get('nombre')?.value,
            this.formGroup.get('idDocumento')?.value,
            this.formGroup.get('numeroDocumento')?.value)
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
  }*/

  clean(): void {
    this.formGroup.get('idSistema')?.setValue('');
  }

  search(): void {
    // this.getEntidad();
  }

  edit(data: Entidad) {
    this.router.navigate(['home/modulos/nueva-opcion', data]);
  }

  delete(data: any) {
    /*const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: {title: 'Eliminar Entidad', message: '¿Está seguro de eliminar la entidad?'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.entidadService.delete(data.idEntidad)
          .subscribe({
            next: res => {
            console.log(res);
            this.openSnackBar(res.message, '✓', 'success-snackbar');
            this.getEntidad();
          },
          error: err => {
            console.log(err);
            this.openSnackBar(err.message, '✗', 'error-snackbar');
          }
        });
      }
    });*/
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [style]
    });
  }

}
