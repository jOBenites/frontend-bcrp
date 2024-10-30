import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entidad } from '../models/entidad.model';
import { DataSourceEntidad } from '../interfaces/datasource-entidad.interface';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Role } from '../models/role.model';
import { DataSourceRole } from '../interfaces/datasource-role.interface';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly baseUrl = environment.apiRest;
  constructor(private readonly http: HttpClient) { }

  public create(data: Role): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/rol', data);
  }  
  public readAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + '/roles');
  }
  public readPaginate(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string, idSistema: string,
    rol: string): Observable<DataSourceRole> {
    return this.http.get<DataSourceRole>(this.baseUrl + `/roles?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&idSistema=${idSistema}&idRol=${rol}`);
  }
  public update(data: Role): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + '/rol/'+ data.idRol, data);
  } 
  public delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/rol/' + id);
  }


}