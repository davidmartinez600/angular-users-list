// TODO: Create an interface for the user model of Back

import { IUserRegister } from "./user-register.model";

/**
 * Representa el modelo de datos de un usuario autenticado.
 *
 * @export
 * @interface IUserAuth
  */
export interface IUserAuth {
  /**
   * Identificador del usuario.
   * @type {number}
   * @memberof IUserAuth
   */
  id: number;

  /**
   * Identificador único del usuario.
   * @type {string}
   * @memberof IUserAuth
   */
  uid: string;

  /**
   * Nombre del usuario.
   * @type {string}
   * @memberof IUserAuth
   */
  name: string;

  /**
   * Correo electrónico del usuario.
   * @type {string}
   * @memberof IUserAuth
   */
  email: string;
}


export interface IUserAuthResponse {
  message: string;
  userData: IUserRegister;
}
