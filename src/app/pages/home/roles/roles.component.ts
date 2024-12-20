import { Component, inject, ViewChild } from '@angular/core';
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
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, NgFor],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

readonly _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
public sistemas: Sistema[];
displayedColumns: string[] = ['numero', 'sistema', 'perfil', 'action'];
dataSource: Role[] = [];
resultsLength = 0;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, 
    readonly router: Router,
    readonly sistemaService: SistemaService,
    readonly roleService: RoleService){
    this.formGroup = this.fb.group({
      idSistema: [''],
      rol: ['']
    });
  }

  ngAfterViewInit() {
   this.getSistemas();
   this.getListado();
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
          return this.roleService.readPaginate(
            this.paginator.pageIndex,  
            this.paginator.pageSize, 
            this.sort.active,
            this.sort.direction,
            this.formGroup.get('idSistema')?.value,
            this.formGroup.get('rol')?.value)
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
    this.formGroup.get('rol')?.setValue('');
  }

  search(): void {
    this.getListado();
  }

  edit(data: Entidad) {
    this.router.navigate(['home/roles/nuevo-rol', data]);
  }

  delete(data: Role) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      data: {title: 'Eliminar Rol', message: '¿Está seguro de eliminar el rol?'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.roleService.delete(data)
          .subscribe({
            next: res => {
            console.log(res);
            this.openSnackBar(res.message, '✓', 'success-snackbar');
            this.getListado();
          },
          error: err => {
            console.log(err);
            this.openSnackBar(err.error.message, '✗', 'error-snackbar');
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
