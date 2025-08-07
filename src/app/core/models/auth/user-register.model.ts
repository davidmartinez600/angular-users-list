/**
 * Modelo de petición de creación de usuario
 * @export
 * @interface IUserRegister
 */
export interface IUser{
  numid:number;
  tipoid:string;
  name:string;
  lastname:string;
  phone:string;
  email:string;
  rol:string;
}

export interface IUserRegister extends IUser{
  id:number;
  uid:string;
  email_verified_at:string|null;
  created_at:string;
  updated_at:string;
}


export interface IUserRegisterReponse {
  error:  boolean;
  user:  IUserRegister;
}


export interface IUserListResponse {
  error:  boolean;
  user:  IUserRegister[];
}
