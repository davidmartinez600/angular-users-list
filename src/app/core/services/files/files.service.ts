import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IDataFileDeleteResponse, IFilesUserResponse } from '@app/core/models/users/files.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private _http = inject(HttpClient);


  getFilesAdminUser( userId: string) {
    const URL = `${environment.API_URL}/user/${userId}/files/admin`;
    return this._http.get<IFilesUserResponse>(URL)
  }

  getFilesUser( UserDocument: number ) {
    const URL = `${environment.API_URL}/user/${UserDocument}/files`;
    return this._http.get<IFilesUserResponse>(URL)
  }

  /**
   * Elimina un archivo a un usuario
   * @param idFile
   */
  removeFileToUser(idFile: number) {
    const url = `${environment.API_URL}/files/delete/${idFile}`;
    return this._http.delete<IDataFileDeleteResponse>(url);
  }

}
