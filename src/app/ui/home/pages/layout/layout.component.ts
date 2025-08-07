import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { FormSearchUserComponent } from '@organims/form-search-user/form-search-user.component';

import { Column, TableDataComponent } from '@molecules/table-data/table-data.component';
import { LoadderComponent } from '@molecules/loadder/loadder.component';
import { IFiles } from '@app/core/models/users/files.model';
import { FilesService } from '@app/core/services/files/files.service';
import { formatBytes } from '@app/shared/helpers/format-bytes.helper';
import { IActionEvent } from '@app/shared/interfaces/event-action.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ CommonModule, TableDataComponent, FormSearchUserComponent, LoadderComponent],
  providers: [DatePipe],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

export class LayoutComponent {

  private _datePipe = inject(DatePipe);

  private _filesService = inject(FilesService);

  private _router = inject(Router);

  isFormValid:boolean = false;
  showDocumentOfUser: boolean = false;

  messageFileUser:string = 'No hay archivos asignados al usuario';

  documentUserToSearch:string = '';

  isLoadderShow: boolean = false;

  columnsFilesUser: Column[] = [
    {
      columnDef: 'id',
      header: '#'
    },
    {
      columnDef: 'name',
      header: 'Nombre de archivo'
    },
    {
      columnDef: 'extention',
      header: 'Extensión del archivo',
    },
    {
      columnDef: 'size',
      header: 'Tamaño',
    },
    {
      columnDef: 'created_at',
      header: 'Creado el',
    },
    {
      columnDef: 'download',
      header: 'Descargar',
      isLink: true,
      icon: 'download',
    }
  ];

  dataFilesUser: any[] = [];

  onChangeFormValidity(isFormValid: boolean){
    this.isFormValid = isFormValid;
    if (!this.isFormValid) {
      this.showDocumentOfUser = false;
    }
  }

  onFormSubmit(value:{document:string}){
    this.isLoadderShow = true;
    this.documentUserToSearch = value.document;
    if (this.documentUserToSearch && this.isFormValid) {
      this.showDocumentOfUser = true;
      this._filesService.getFilesUser(Number(this.documentUserToSearch)).subscribe({
        next: (response) => {
          if(response.error) {
            this.messageFileUser = 'Usuario no encontrado, revise el número de documento';
            console.log('Hubo un error al obtener los archivos del usuario');
            return;
          }
          this.messageFileUser = 'No hay archivos asignados al usuario';
          this.dataFilesUser = this.mapFilesUser(response.files.original.files);
        },
        error: (err) => {
          this.isLoadderShow = false;
          this.dataFilesUser = [];
          if( err.status === 404){
            this.messageFileUser = 'Usuario no encontrado, revise el número de documento';
            return;
          }
        },
        complete: () => {
          this.isLoadderShow = false;
        }
      });
    }
  }

  mapFilesUser(files: IFiles[]) {
    return files.map((file) => {
      return {
        id: file.id,
        name: file.nameFile,
        extention: file.extFile.toUpperCase(),
        size: formatBytes(file.sizeFile, 2),
        created_at: this._datePipe.transform(file.created_at, 'dd - MMMM - yyyy'),
        download: `/${file.linkFile}`
      }
    });
  }


  /**
   * Permite realizar una acción cuando se selecciona una acción en la tabla
   * @param objectEmited
   * @memberof ListUsersComponent
   */
  eventActionSelect( objectEmited: IActionEvent ) {
    const { action, row, column } = objectEmited;
    if( action === 'download' && action === column.columnDef ) {
      const URL_FILE = `${environment.APP_STORAGE}${row[action]}`
       window.open(URL_FILE, '_blank');
    }
  }
}
