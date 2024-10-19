import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { catchError, map, merge, Observable, of, startWith, switchMap } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
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
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule,    MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, DatePipe, DialogConfirmationComponent],
  templateUrl: './sistemas.component.html',
  styleUrl: './sistemas.component.scss'
})
export class SistemasComponent implements AfterViewInit {
private _snackBar = inject(MatSnackBar);
readonly dialog = inject(MatDialog);
displayedColumns: string[] = [ 'codigo', 'nombre', 'version', 'action'];
dataSource: Sistema[];

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
constructor(readonly fb: FormBuilder, 
  readonly router: Router,
  readonly sistemaService: SistemaService){
  this.formGroup = this.fb.group({
    codigo: [''],
    sistema: [''],
    version: ['']
  });
  this.dataSource = [];
}

  ngAfterViewInit() {
    this.getSistemas();
  }

  getSistemas(){
    this.sistemaService.readPaginate()
    .subscribe({
      next: res =>{
        console.log(res);
        this.dataSource = res.content;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  clean() {
    this.formGroup.reset();
  }

  search() {}

  edit(data: Sistema) {
    this.router.navigate(['home/sistemas/formulario', data]);
  }

  delete(data: any) {
    console.log(data);
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.sistemaService.delete(data.idSistema)
        .subscribe({
          next: res => {
          console.log(res);
          this.openSnackBar(res.message, 'undo');
          this.getSistemas();
        },
        error: err => {
          let errors = err.error;
          console.log(errors);
          this.openSnackBar(JSON.stringify(errors), 'undo');
        }
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}