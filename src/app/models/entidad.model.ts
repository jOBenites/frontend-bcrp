type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Entidad {

  readonly idEntidad: number;
  readonly idDocumento: number;
  readonly numeroDocumento: string;
  readonly nombre: string;
  readonly sigla: string;
  readonly codExterno: string;

  public set setIdentidad(idEntidad: number){
    (this as Writeable<Entidad>).idEntidad = idEntidad;
  }
  public set setIdDocumento(idDocumento: number){
    (this as Writeable<Entidad>).idDocumento = idDocumento;
  }
  public set setNumeroDocumento(numeroDocumento: string){
    (this as Writeable<Entidad>).numeroDocumento = numeroDocumento;
  }
  public set setNombre(nombre: string){
    (this as Writeable<Entidad>).nombre = nombre;
  }
  public set setSigla(sigla: string){
    (this as Writeable<Entidad>).sigla = sigla;
  }
  public set setCodExterno(codExterno: string){
    (this as Writeable<Entidad>).codExterno = codExterno;
  }
  
}

export interface DocumentoIdentidad {
  idDocumentoIdentidad: number;
  tipoDocumentoIdentidad: string;
}