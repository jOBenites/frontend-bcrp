import { Entidad } from "../models/entidad.model";

export interface DataSourceEntidad {
  content: Entidad[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}