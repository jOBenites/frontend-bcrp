import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entidad } from '../models/entidad.model';
import { DataSourceEntidad } from '../interfaces/datasource-entidad.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
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
  public readAll(): Observable<DataSourceEntidad> {
    return this.http.get<DataSourceEntidad>(this.baseUrl + '/entidades');
  }
  public readPaginate(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string, nombre: string,
    tipoDoc: string, numDoc: string
  ): Observable<DataSourceEntidad> {
    return this.http.get<DataSourceEntidad>(this.baseUrl + `/entidades?pageNumber=${pageNumber}&pageSize=${pageSize}
      &sortBy=${sortBy}&sortOrder=${sortOrder}&name=${nombre}&documentType=${tipoDoc}&documentNumber=${numDoc}`);
  }
  public update(data: Entidad): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + '/entidad/'+ data.entityId, data);
  } 
  public delete(data: Entidad): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/entidad/' + data.entityId);
  }
  public obtenerDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.baseUrl + '/entidad/documentos');
  } 


}
