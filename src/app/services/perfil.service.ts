import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entidad } from '../models/entidad.model';
import { DataSourceEntidad } from '../interfaces/datasource-entidad.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Role } from '../models/role.model';
import { DataSourceRole } from '../interfaces/datasource-role.interface';
import { Perfil } from '../models/perfil.model';
import { DataSourcePerfil } from '../interfaces/datasource-perfil.interface';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly baseUrl = environment.apiRest;
  constructor(private readonly http: HttpClient) { }

  public create(data: Perfil): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/perfil', data);
  }  
  public readAll(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.baseUrl + '/perfiles');
  }
  public readPaginate(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string, idSistema: string,
    perfil: string): Observable<DataSourcePerfil> {
    return this.http.get<DataSourcePerfil>(this.baseUrl + `/perfiles?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&idSistema=${idSistema}&idPerfil=${perfil}`);
  }
  public update(data: Perfil): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + '/perfil/'+ data.idPerfil, data);
  } 
  public delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/perfil/' + id);
  }


}
