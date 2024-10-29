import { Opcion } from "../models/opcion.model";

export interface DataSourceOpcion {
  content: Opcion[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}