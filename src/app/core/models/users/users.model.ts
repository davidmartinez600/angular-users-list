/**
 * Interfas que identifica el modelo de datos de un cliente
 */
export interface IUsers {
  id?: number;
  uid?: string;
  name: string;
  lastname: string;
  typeDoc: string;
  numDoc: string;
  email: string;
  phone: string;
  rol: IUserRoles;
}


export interface IUserRoles {
  id: number;
  rol: string;
}
