import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

import { IActionEvent } from '@interfaces/event-action.interface';
import { EmptyDataTableComponent } from '@organims/empty-data-table/empty-data-table.component';

/* Angular Material */
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
];

export interface Column {
  columnDef: string;
  header: string;
  cell?: Function;
  isLink?: boolean;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CommonModule, EmptyDataTableComponent, RouterLink, ...MATERIAL_MODULES],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {


  /**
   * Paginador de la tabla
   * @type {MatPaginator}
   * @memberof TableDataComponent
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Ordenador de la tabla
   * @type {MatSort}
   * @memberof TableDataComponent
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Título de la tabla en caso de que no haya datos
   * @type {string}
   * @memberof TableDataComponent
   */
  @Input() emptyTitleTable: string = 'No hay datos para mostrar';

  /**
   * Columnas que se mostrarán en la tabla
   * @type {Column[]} Array de objetos de tipo Column
   * @memberof TableDataComponent
   */
  @Input() columnsTable: Column[] = [];

  /**
   * Datos que se mostrarán en la tabla
   * @type {any[]} Array de objetos que coinciden con las columnas data
   * @memberof TableDataComponent
   */
  @Input() set dataSource(data: any[]) {
    this.setDataSource(data);
  }

  /**
   * Evento que se emite cuando se selecciona una acción en la tabla
   * @type {EventEmitter<IActionEvent>}
   * @memberof TableDataComponent
   */
  @Output() eventActionSelect:EventEmitter<IActionEvent> = new EventEmitter();

  /**
   * Controla si el componente se muestra en un dispositivo móvil
   * @type {boolean}
   * @memberof TableDataComponent
   */
  isMobile: boolean = false;

   /**
   * Acciones que se mostrarán en la tabla
   * @type {string[]}
   * @memberof TableDataComponent
   */
   actionShow: string[] = ['show', 'edit', 'download', 'delete'];

   /**
    * Columnas con el label  que se mostrarán en la tabla para el usuario
    * @type {string[]} Array de strings
    * @memberof TableDataComponent
    */
   displayedColumns: Array<string> = [];

   /**
    * Controla el dataSource de la tabla
    * @type {MatTableDataSource<any>}
    * @memberof TableDataComponent
    */
   _dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(max-width: 992px)']).subscribe(result => {
      this.isMobile = result.matches ? true : false;
    });
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnsTable.map((colum) => colum.columnDef);
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

  /**
   * Establece el dataSource de la tabla desde el Input dataSource
   * @param data
   * @memberof TableDataComponent
   */
  setDataSource(data: any) {
    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
    this._dataSource = new MatTableDataSource<any>(data);
  }

  /**
   * Comprueba si la columna tiene la acción show
   * @param columnDef
   * @returns
   */
  hasActionShow(columnDef: string): boolean {
    return this.actionShow.includes(columnDef);
  }

  /**
   * Aplica el filtro en la tabla
   * @param {Event} event
   * @memberof TableDataComponent
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.toLowerCase();
    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }
  }

  getRouterLink( linkFile: string) {
    return `${environment.APP_STORAGE}${linkFile}`;
  }

  eventActionShowFunction(column:Column, row:any ){
    const action_event = column.columnDef;
    const emitObject: IActionEvent = {
      action: action_event,
      column: column,
      row: row
    }
    this.eventActionSelect.emit(emitObject);
  }
}
