import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Modulo } from '../models/modulo.model';
import { DataSourceModulo } from '../interfaces/datasource-modulo.interface';
import { Opcion } from '../models/opcion.model';
import { DataSourceOpcion } from '../interfaces/datasource-opcion.interface';


@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  private readonly baseUrl = environment.apiRest;
  constructor(private readonly http: HttpClient) { }

  public create(data: Opcion): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/opcion', data);
  }  
  public readAll(): Observable<DataSourceOpcion> {
    return this.http.get<DataSourceOpcion>(this.baseUrl + '/opciones');
  }
  public readPaginate(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string, idSistema: string,
    idModulo:string
  ): Observable<DataSourceOpcion> {
    return this.http.get<DataSourceOpcion>(this.baseUrl + `/opciones?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&idSistema=${idSistema}&idModulo=${idModulo}`);
  }
  public update(data: Opcion): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + '/opcion/'+ data.idOpcion, data);
  } 
  public delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/opcion/' + id);
  }

}
