import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entidad } from '../models/entidad.model';
import { DataSourceEntidad } from '../interfaces/datasource-entidad.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.interface';
import { Documento } from '../interfaces/documento.interface';


@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  private readonly baseUrl = environment.apiRest;
  constructor(private readonly http: HttpClient) { }

  public create(data: Entidad): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/entidad', data);
  }  
  public readAll(): Observable<Entidad[]> {
    return this.http.get<Entidad[]>(this.baseUrl + '/entidades');
  }
  public readPaginate(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string, nombre: string
  ): Observable<DataSourceEntidad> {
    return this.http.get<DataSourceEntidad>(this.baseUrl + `/entidades?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&nombre=${nombre}`);
  }
  public update(data: Entidad): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + '/entidad/'+ data.idEntidad, data);
  } 
  public delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/entidad/' + id);
  }
  public obtenerDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.baseUrl + '/entidad/documentos');
  } 


}
