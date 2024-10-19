import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sistema } from '../models/sistema.model';
import { DataSourceSistema } from '../interfaces/datasource-sistema.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  private readonly baseUrl = environment.apiRest;
  constructor(private readonly http: HttpClient) { }

  public create(data: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/sistema', data);
  }  
  public readAll(): Observable<Sistema[]> {
    return this.http.get<Sistema[]>(this.baseUrl + '/sistemas');
  }
  public readPaginate(): Observable<DataSourceSistema> {
    return this.http.get<DataSourceSistema>(this.baseUrl + '/sistemas');
  }
  public update(data: FormData): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + '/sistema', data);
  } 
  public delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/sistema/' + id);
  } 
  
}
