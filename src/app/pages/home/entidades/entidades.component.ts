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
// import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatIconModule, DatePipe],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.scss'
})
export class EntidadesComponent implements AfterViewInit {

private _httpClient = inject(HttpClient);

displayedColumns: string[] = ['number', 'state', 'title', 'created'];
exampleDatabase: ExampleHttpDatabase | undefined;
data: GithubIssue[] = [];

resultsLength = 0;
isLoadingResults = true;
isRateLimitReached = false;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, readonly router: Router){
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  clean(): void {
    this.formGroup.reset();
  }

  search(): void {

  }

}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }

}

