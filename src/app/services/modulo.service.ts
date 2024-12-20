import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Modulo } from '../models/modulo.model';
import { DataSourceModulo } from '../interfaces/datasource-modulo.interface';


@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private readonly baseUrl = environment.apiRest;
  constructor(private readonly http: HttpClient) { }

  public create(data: Modulo): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/modulo', data);
  }  
  public readAll(): Observable<DataSourceModulo> {
    return this.http.get<DataSourceModulo>(this.baseUrl + '/modulos');
  }
  public readPaginate(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string, idSistema: string): Observable<DataSourceModulo> {
    return this.http.get<DataSourceModulo>(this.baseUrl + `/modulos?pageNumber=${pageNumber}&pageSize=${pageSize}
      &sortBy=${sortBy}&sortOrder=${sortOrder}&systemId=${idSistema}`);
  }
  public update(data: Modulo): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + '/modulo/'+ data.moduleId, data);
  } 
  public delete(data: Modulo): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/modulo/' + data.moduleId);
  }

}
