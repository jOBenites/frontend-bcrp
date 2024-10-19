import { Sistema } from "../models/sistema.model";

// type ArrayType<T>  = T[ ];
export interface DataSourceSistema {
  content: Sistema[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}