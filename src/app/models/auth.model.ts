type Writeable<T> = { -readonly [P in keyof T]: T[P] };
// type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export class Auth {
  
  readonly usuario: string;
  readonly password: string;
  readonly hiddenCaptcha: string;
  readonly captcha: string;

  public set setUsuario(usuario: string) {
    (this as Writeable<Auth>).usuario = usuario; 
  }

  public set setPassword(password: string) {
    (this as Writeable<Auth>).password = password;
  }

  public set setHiddenCaptcha(hiddenCaptcha: string) {
    (this as Writeable<Auth>).hiddenCaptcha = hiddenCaptcha;
  }

  public set setCaptcha(captcha: string) {
    (this as Writeable<Auth>).captcha = captcha;
  }

}