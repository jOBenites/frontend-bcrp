import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSourceSistema } from '../interfaces/datasource-sistema.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { DataSourceUsuario } from '../interfaces/datasource-usuario.interface';
import { Usuario } from '../models/usuario.model';
import { Documento } from '../interfaces/documento.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly baseUrl = environment.apiRest;
  constructor(private readonly http: HttpClient) { }

  public create(data: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/usuario', data);
  }  
  public readAll(): Observable<DataSourceUsuario> {
    return this.http.get<DataSourceUsuario>(this.baseUrl + '/usuarios');
  }
  public readPaginate(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string,
    idSistema: string, tipoDocumento: string, numeroDocumento: string, ambito: string, nombres: string
  ): Observable<DataSourceUsuario> {
    return this.http.get<DataSourceUsuario>(this.baseUrl + `/usuarios?pageNumber=${pageNumber}&pageSize=${pageSize}
      &sortBy=${sortBy}&sortOrder=${sortOrder}&systemId=${idSistema}&documentType=${tipoDocumento}&documentNumber=${numeroDocumento}&ambito=${ambito}&nombres=${nombres}`);
  }
  public update(data: Usuario): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + `/usuario/${data.userId}`, data);
  } 
  public delete(data: Usuario): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + `/usuario/${data.userId}/inhabilitar`, {});
  } 
  public obtenerDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.baseUrl + '/usuario/documentos');
  } 
  
}
