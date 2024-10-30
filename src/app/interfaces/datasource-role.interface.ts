import { Role } from "../models/role.model";

export interface DataSourceRole {
  content: Role[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}