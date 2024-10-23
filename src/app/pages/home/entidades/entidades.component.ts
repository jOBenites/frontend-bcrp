import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { catchError, map, merge, Observable, of, startWith, switchMap } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Entidad } from '../../../models/entidad.model';
import { EntidadService } from '../../../services/entidad.service';
import { DialogConfirmationComponent } from '../../../components/dialog-confirmation/dialog-confirmation.component';
// import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, DatePipe],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.scss'
})
export class EntidadesComponent implements AfterViewInit {

readonly _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
displayedColumns: string[] = ['nombre', 'sigla', 'codExterno', 'action'];
dataSource: Entidad[] = [];
resultsLength = 0;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly entidadService: EntidadService){
    this.formGroup = this.fb.group({
      nombre: ['']
    });
  }

  ngAfterViewInit() {
   this.getEntidad();
  }

  getEntidad(){
    // If the user changes the sort order, reset back to the first page.
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
            this.formGroup.get('nombre')?.value)
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
    this.formGroup.get('nombre')?.setValue('');
  }

  search(): void {
    this.getEntidad();
  }

  edit(data: Entidad) {
    this.router.navigate(['home/entidades/nueva-entidad', data]);
  }

  delete(data: any) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
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