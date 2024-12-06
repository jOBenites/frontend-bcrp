type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export class Mfa {
  
  readonly username: string;
  readonly otp: string;
  
  public set setUsername(username: string) {
    (this as Writeable<Mfa>).username = username;
  }

  public set setOtp(otp: string) {
    (this as Writeable<Mfa>).otp = otp;
  }

}