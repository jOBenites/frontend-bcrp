type Writeable<T> = { -readonly [P in keyof T]: T[P] };
// type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export class Usuario {
  
  readonly idUsuario: number;
  readonly tipoDocumento: string;
  readonly numeroDocumento: string;
  readonly nombres: string;
  readonly apePaterno: string;
  readonly apeMaterno: string;
  readonly correoElectronico: string;
  readonly ambito: string;
  readonly sustento: string;

  public set setIdUsuario(idUsuario: number) {
    (this as Writeable<Usuario>).idUsuario = idUsuario; 
  }

  public set setTipoDocumento(tipoDocumento: string) {
    (this as Writeable<Usuario>).tipoDocumento = tipoDocumento; 
  }

  public set setNumeroDocumento(numeroDocumento: string) {
    (this as Writeable<Usuario>).numeroDocumento = numeroDocumento;
  }

  public set setNombres(nombres: string) {
    (this as Writeable<Usuario>).nombres = nombres;
  }

  public set setApePaterno(apePaterno: string) {
    (this as Writeable<Usuario>).apePaterno = apePaterno;
  }

  public set setApeMaterno(apeMaterno: string) {
    (this as Writeable<Usuario>).apeMaterno = apeMaterno;
  }

  public set setCorreoEletronico(correoElectronico: string) {
    (this as Writeable<Usuario>).correoElectronico = correoElectronico;
  }

  public set setAmbito(ambito: string) {
    (this as Writeable<Usuario>).ambito = ambito;
  }

  public set setSustento(sustento: string) {
    (this as Writeable<Usuario>).sustento = sustento;
  }

}