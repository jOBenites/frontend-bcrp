import { Modulo } from "../models/modulo.model";

export interface DataSourceModulo {
  content: Modulo[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}