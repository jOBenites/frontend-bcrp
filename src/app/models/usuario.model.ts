type Writeable<T> = { -readonly [P in keyof T]: T[P] };
// type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export class Usuario {
  
  readonly usuario: string;
  readonly password: string;
  readonly hiddenCaptcha: string;
  readonly captcha: string;

  public set setUsuario(usuario: string) {
    (this as Writeable<Usuario>).usuario = usuario; 
  }

  public set setPassword(password: string) {
    (this as Writeable<Usuario>).password = password;
  }

  public set setHiddenCaptcha(hiddenCaptcha: string) {
    (this as Writeable<Usuario>).hiddenCaptcha = hiddenCaptcha;
  }

  public set setCaptcha(captcha: string) {
    (this as Writeable<Usuario>).captcha = captcha;
  }

}