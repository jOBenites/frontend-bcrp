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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Sistema } from '../../../models/sistema.model';
import { SistemaService } from '../../../services/sistema.service';
import { DialogConfirmationComponent } from '../../../components/dialog-confirmation/dialog-confirmation.component';
// import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-listado-sistema',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, DatePipe, DialogConfirmationComponent],
  templateUrl: './sistemas.component.html',
  styleUrl: './sistemas.component.scss'
})
export class SistemasComponent implements AfterViewInit {
readonly _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
displayedColumns: string[] = ['nombre', 'version', 'responsable', 'responsableAlt', 'unidadOrg', 'action'];
dataSource: Sistema[] = [];
resultsLength = 0;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
constructor(readonly fb: FormBuilder, 
  readonly router: Router,
  readonly sistemaService: SistemaService){
  this.formGroup = this.fb.group({
    // codigo: [''],
    sistema: [''],
    version: ['']
  });
}
  ngAfterViewInit(): void {
    this.getSistemas();
  }


  getSistemas(){
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.sistemaService.readPaginate(
            this.paginator.pageIndex,  
            this.paginator.pageSize, 
            this.sort.active,
            this.sort.direction,
            this.formGroup.get('codigo')?.value,
            this.formGroup.get('sistema')?.value,
            this.formGroup.get('version')?.value)
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

  clean() {
    this.formGroup.get('codigo')?.setValue('');
    this.formGroup.get('sistema')?.setValue('');
    this.formGroup.get('version')?.setValue('');
  }

  search() {
    this.getSistemas();
  }

  edit(data: Sistema) {
    this.router.navigate(['home/sistemas/formulario', data]);
  }

  delete(data: any) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: {title: 'Eliminar Sistema', message: '¿Está seguro de eliminar el sistema?'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.sistemaService.delete(data.idSistema)
          .subscribe({
            next: res => {
            console.log(res);
            this.openSnackBar(res.message, '✓', 'success-snackbar');
            this.getSistemas();
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