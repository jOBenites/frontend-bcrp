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
import { ModuloService } from '../../../services/modulo.service';
import { Modulo } from '../../../models/modulo.model';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, NgFor],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.scss'
})
export class ModulosComponent implements AfterViewInit {

readonly _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
public sistemas: Sistema[];
displayedColumns: string[] = ['numero', 'nombreModulo', 'action'];
dataSource: Modulo[] = [];
resultsLength = 0;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly sistemaService: SistemaService,
    readonly moduloService: ModuloService){
    this.formGroup = this.fb.group({
      idSistema: ['']
    });
  }

  ngAfterViewInit() {
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

  getModulos() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.moduloService.readPaginate(
            this.paginator.pageIndex,  
            this.paginator.pageSize, 
            this.sort.active,
            this.sort.direction,
            this.formGroup.get('idSistema')?.value)
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
  }

  search(): void {
    this.getModulos();
  }

  edit(data: Entidad) {
    this.router.navigate(['home/modulos/nuevo-modulo', data]);
  }

  delete(data: any) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: {title: 'Eliminar Módulo', message: '¿Está seguro de eliminar el módulo?'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.moduloService.delete(data.idModulo)
          .subscribe({
            next: res => {
            console.log(res);
            this.openSnackBar(res.message, '✓', 'success-snackbar');
            this.getModulos();
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
