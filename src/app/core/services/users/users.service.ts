import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IUser, IUserListResponse, IUserRegisterReponse } from '@core/models/auth/user-register.model';
import { IDataFileAsigned, IDataFileAsignedResponse } from '@app/core/models/users/files.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Permite listar los isiarios de tipo 'user' registrados en el sistema
   * @memberof AuthService
   * @private
   * @readonly
   */
  private _http = inject(HttpClient);

  /**
   * Permite listar los isiarios de tipo 'user' registrados en el sistema
   * @memberof AuthService
   * */
  listUser() {
    const url = `${environment.API_URL}/user/list`;
    return this._http.get<IUserListResponse>(url);
  }

  /**
   * Permite obtener un Uusuario registrado en el sistema
   *
   * @param {number} idUser
   * @memberof AuthService
   */

  getUser(idUser: number) {
    const url = `${environment.API_URL}/user/edit/${idUser}`;
    return this._http.get<IUserRegisterReponse>(url);
  }

  /**
   * Permite Actualizar un usuario en el sistema
   * @param user
   * @param idUser
   * @returns
   */
  updateUser(user: IUser, idUser: number) {
    const url = `${environment.API_URL}/user/update/${idUser}`;
    return this._http.post<IUserRegisterReponse>(url, user);
  }

  /**
   * Retorna la lista de usuarios de tipo 'admin' registrados en el sistema
   * @returns {Observable<IUserListResponse>}
   * @memberof AuthService
   */
  getUserAdmins() {
    const url = `${environment.API_URL}/user/list/admin`;
    return this._http.get<IUserListResponse>(url);
  }

  /**
   * Asiigna un archivo a un usuario especifico
   * @param dataFileAsigned
   */
  asignedFileToUser(dataFileAsigned: IDataFileAsigned): any {
    const formData = new FormData();
    formData.append('idAdmin',  dataFileAsigned.idAdmin);
    formData.append('idUser',   dataFileAsigned.idUser);
    formData.append('nameFile', dataFileAsigned.nameFile);
    formData.append('linkFile', dataFileAsigned.linkFile);

    const url = `${environment.API_URL}/files/create`;
    return this._http.post<IDataFileAsignedResponse>(url, formData);
  }


}
