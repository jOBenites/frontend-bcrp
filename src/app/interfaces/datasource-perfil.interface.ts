import { Perfil } from "../models/perfil.model";

export interface DataSourceRole {
  content: Perfil[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}