interface SubOpciones {
  titulo: string;
  url: string;
}

interface Opciones {
  icono: string;
  titulo: string;
  subopciones: Array<SubOpciones>;
}

export interface Menu {
  idSistema: number;
  opciones: Array<Opciones>;
}