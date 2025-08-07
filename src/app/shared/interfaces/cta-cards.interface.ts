/**
 * Representa la interfaz de los CTA Cards en Dashboard
 * @interface ICtaCards
 */
export interface ICtaCards {
  /**
   * Titulo del CTA Card
   * @type {string}
   * @memberof ICtaCards
   */
  title: string;

  /**
   * Nombre del icono del CTA Card
   * @type {string}
   * @memberof ICtaCards
   */
  icon: string;

  /**
   * Link de redirección del CTA Card
   * @type {string}
   * @memberof ICtaCards
   */
  routerLink: string;

  /**
   * Indica si el link es externo
   * @type {boolean}
   * @memberof ICtaCards
   */
  external?: boolean;
}
