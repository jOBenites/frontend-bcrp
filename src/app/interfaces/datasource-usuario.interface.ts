import { Usuario } from "../models/usuario.model";

export interface DataSourceUsuario {
  content: Usuario[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}