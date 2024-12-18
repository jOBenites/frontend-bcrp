type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Entidad {

  readonly entityId: number;
  readonly documentId: number;
  readonly documentNumber: string;
  readonly name: string;
  readonly initials: string;
  readonly externalCode: string;
  readonly state: string;

  public set setIdentidad(idEntidad: number){
    (this as Writeable<Entidad>).entityId = idEntidad;
  }
  public set setIdDocumento(idDocumento: number){
    (this as Writeable<Entidad>).documentId = idDocumento;
  }
  public set setNumeroDocumento(numeroDocumento: string){
    (this as Writeable<Entidad>).documentNumber = numeroDocumento;
  }
  public set setNombre(nombre: string){
    (this as Writeable<Entidad>).name = nombre;
  }
  public set setSigla(sigla: string){
    (this as Writeable<Entidad>).initials = sigla;
  }
  public set setCodExterno(codExterno: string){
    (this as Writeable<Entidad>).externalCode = codExterno;
  }
  public set setEstado(estado: string){
    (this as Writeable<Entidad>).state = estado;
  }
  
}

export interface DocumentoIdentidad {
  idDocumentoIdentidad: number;
  tipoDocumentoIdentidad: string;
}