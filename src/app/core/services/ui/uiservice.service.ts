import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ISystemState } from '@app/core/models/users/system.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

  private drawerState = new BehaviorSubject<boolean>(true);
  drawerState$ = this.drawerState.asObservable();

  private _http = inject(HttpClient);

  /**
   * Cambia el estado del drawer
   *
   * @returns void
   * @memberof UIServiceService
   */
  toggleDrawer() {
    const state = this.drawerState.getValue();
    if (state !== null) {
      this.drawerState.next(!state);
    }
  }


  /**
   * Obtener data Dashboard
   * @returns {Observable<any>}
   * @memberof UIServiceService
   */
  dataSystem() {
    const url = `${environment.API_URL}/data/system`;
    return this._http.get<ISystemState>(url);
  }
}
