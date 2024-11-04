import { Perfil } from "../models/perfil.model";

export interface DataSourcePerfil {
  content: Perfil[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}