/**
 * Modelo de respuesta de login
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
  /**
   * Token de acceso
   * @type {string}
   * @memberof LoginResponse
   */
  access_token: string;

  /**
   * Tipo de token
   * @type {string}
   * @memberof LoginResponse
   */
  token_type: string;

  /**
   * Tiempo de expiración del token
   * @type {number}
   * @memberof LoginResponse
   */
  expires_in: number;
}
