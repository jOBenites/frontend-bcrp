type Writeable<T> = { -readonly [P in keyof T]: T[P] };
// type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export class Usuario {
  
  readonly userId: number;
  readonly documentId: string;
  readonly documentNumber: string;
  readonly names: string;
  readonly fatherSurname: string;
  readonly motherSurname: string;
  readonly email: string;
  readonly scope: string;
  readonly sustento: string;

  public set setIdUsuario(idUsuario: number) {
    (this as Writeable<Usuario>).userId = idUsuario; 
  }

  public set setTipoDocumento(tipoDocumento: string) {
    (this as Writeable<Usuario>).documentId = tipoDocumento; 
  }

  public set setNumeroDocumento(numeroDocumento: string) {
    (this as Writeable<Usuario>).documentNumber = numeroDocumento;
  }

  public set setNombres(nombres: string) {
    (this as Writeable<Usuario>).names = nombres;
  }

  public set setApePaterno(apePaterno: string) {
    (this as Writeable<Usuario>).fatherSurname = apePaterno;
  }

  public set setApeMaterno(apeMaterno: string) {
    (this as Writeable<Usuario>).motherSurname = apeMaterno;
  }

  public set setCorreoEletronico(correoElectronico: string) {
    (this as Writeable<Usuario>).email = correoElectronico;
  }

  public set setAmbito(ambito: string) {
    (this as Writeable<Usuario>).scope = ambito;
  }

  public set setSustento(sustento: string) {
    (this as Writeable<Usuario>).sustento = sustento;
  }

}