import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressFileComponent } from '../../molecules/progress-file/progress-file.component';
import { DndDirective } from '@app/shared/directives/dnd.directive';
import { IconUploadComponent } from '../../atoms/icon-upload/icon-upload.component';
import { IconFileComponent } from '../../atoms/icon-file/icon-file.component';
import { IconDeleteComponent } from '../../atoms/icon-delete/icon-delete.component';
import { TEXT_REGEX } from '@shared/helpers/const_pattern';
import { AuthService } from '@app/core/services/auth/auth.service';
import { IUserAuth } from '@app/core/models/auth/user.model';
import { CustomFile, IDataFileAsigned, IDataFileAsignedResponse } from '@app/core/models/users/files.model';

// ANGULAR MATERIAL MODULES
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '@app/core/services/users/users.service';
import { LoadderComponent } from '../../molecules/loadder/loadder.component';



const MATERIAL_MODULES = [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSnackBarModule];


@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    DndDirective,
    CommonModule,
    ReactiveFormsModule,
    ProgressFileComponent,
    IconUploadComponent,
    IconFileComponent,
    IconDeleteComponent,
    LoadderComponent,
    ...MATERIAL_MODULES,
  ],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  /**
   * Usuario a editar
   * @type {string}
   * @memberof UploadFileComponent
   */
  @Input() userEdit!: string | null;

  @Output() uploadeEvent: EventEmitter<number> = new EventEmitter<number>();


  isLoadderShow: boolean = false;

  /**
   * Archivos cargados por el usuario
   * @var files
   * @type {CustomFile[]} (Array)
   * @memberof UploadFileComponent
   */
  files: CustomFile[] = [];

  /**
   * Archivos aceptados para ser cargados}
   * @type {string[]} (Array)
   * @var filesAcceps
   * @example ['.pdf','.txt']
   * @memberof UploadFileComponent
   */
  filesAcceps: string[] = ['.PDF'];

  /**
   * Tamaño máximo de los archivos a cargar
   * @type {number}
   * @var maxFileSize
   * @memberof UploadFileComponent
   */
  maxFilesUpload: number = 3;

  /**
   * Tamaño máximo de los archivos a cargar en MB
   * @type {number}
   * @var maxFileSize
   *
   */
  maxFileSizeMB: number = 30;

  /**
   * Fomrulario para asignar archivos al usuario
   * @type {FormGroup}
   */
  formUploadFile!: FormGroup;

  /**
   * Perfil del usuario autenticado
   * @type {IUserAuth | null}
   * @memberof UploadFileComponent
  */
  profileAuthUser: IUserAuth | null = null;

  /**
   * Referencia al elemento HTML
   * @type {ElementRef}
   * @memberof UploadFileComponent
   */
  @ViewChild('fileDropRef', { read: ElementRef }) fileDropRef!: ElementRef;

  /**
   * Inyectar el FormBuilder
   * @type {FormBuilder}
   * @private
   * @memberof UploadFileComponent
   */
  private _fb = inject(FormBuilder);

  /**
   * Inyectar el MatSnackBar
   * @type {MatSnackBar}
   * @private
   * @memberof UploadFileComponent
   */
  private _snackBar = inject(MatSnackBar);

  /**
   * Inyectar el AuthService
   * @type {AuthService}
   * @private
   * @memberof UploadFileComponent
   */
  private _auth = inject(AuthService);

  /**
   * Inyectar el UserService
   * @type {UserService}
   * @private
   * @memberof UploadFileComponent
   */
  private _userService = inject(UserService);

  private _cdr = inject(ChangeDetectorRef);


  /**
   * Obtener los archivos aceptados para ser cargados
   * @readonly
   * @type {string}
   * @memberof UploadFileComponent
   */
  get showfilesAcceps(): string {
    return this.filesAcceps.map((item) => item.toUpperCase()).join(', ');
  }

  public validationMsgs = {
    fileNameControl: [
      { type: 'require', message: 'Este Campo es requerido' },
      { type: 'minlength', message: 'El nombre del archivo debe tener al menos 5 caracteres' },
      //{ type: 'pattern', message: 'El nombre del archivo solo puede contener letras y números' },
    ],
  };

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.profileAuthUser$();
  }

  /**
   * Construir el formulario
   * @memberof UploadFileComponent
   * @returns {void}
   */
  buildForm() {
    this.formUploadFile = this._fb.group({
      fileNames: this._fb.array([]),
    });
  }

  /**
   * Obtener los controles del formulario
   * @readonly
   * @memberof UploadFileComponent
   * @returns
   */
  private createFilesFormGroup(): FormGroup {
    return new FormGroup({
      fileNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(TEXT_REGEX),
      ]),
    });
  }

  private removeOrClearControlFiles(index: number) {
    const fileNames = this.formUploadFile.get('fileNames') as FormArray;
    fileNames.removeAt(index);
  }

  public addFileFormGroup() {
    const fileNames = this.formUploadFile.get('fileNames') as FormArray;
    fileNames.push(this.createFilesFormGroup());
  }

  getControlsFormUploadFile() {
    return (this.formUploadFile.get('fileNames') as FormArray).controls;
  }

  /**
   * Evento  del Drop de archivos en el componente Cargar Archivo
   * @param {FileList[]} fileList
   * @memberof UploadFileComponent
   * @returns {void}
   */
  onFileDropped(fileList: FileList[]) {
    this.prepareFilesList(fileList);
    this.fileDropRef.nativeElement.classList.remove('fileover');
  }

  /**
   * Manejar el evento de seleccionar archivos desde el navegador
   * @param InputFile (Input de tipo file)
   * @memberof UploadFileComponent
   * @returns {void}
   */
  fileBrowseHandler($event: Event) {
    const inputFile = $event.target as HTMLInputElement;
    if (inputFile.files) {
      this.prepareFilesList(inputFile.files);
    }
  }

  /**
   * Convertir los archivos a un array de archivos y añade un progress de 0
   * @param {FileList[]} fileList
   * @memberof UploadFileComponent
   */
  prepareFilesList(fileList: FileList | FileList[]) {
    const files: File[] = [];

    if (fileList instanceof FileList) {
      for (let i = 0; i < fileList.length; i++) {
        const isValidFile = this.validateExtension(fileList[i]);
        const isValidSize = this.validateSizeFile(fileList[i]);
        if (!isValidFile || !isValidSize) {
          continue;
        }
        files.push(fileList[i]);
      }
    } else if (Array.isArray(fileList)) {
      fileList.forEach((fileListItem) => {
        for (let i = 0; i < fileListItem.length; i++) {
          const isValidFile = this.validateExtension(fileListItem[i]);
          const isValidSize = this.validateSizeFile(fileListItem[i]);
          if (!isValidFile || !isValidSize) {
            continue;
          }
          files.push(fileListItem[i]);
        }
      });
    }

    // Luego, verificamos si agregar cada archivo superaría el límite
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (this.files.length < this.maxFilesUpload) {
        const customFile: CustomFile = file as CustomFile;
        customFile.progress = 0;
        this.files.push(customFile);
        this.uploadFilesSimulator(i);
        this.addFileFormGroup();
        this.formUploadFile.markAllAsTouched();
      } else {
        this._snackBar.open(`No se puede agregar ${file.name} ya que has alcanzado el límite de archivos.`, 'Cerrar');
      }
    }
  }

  /**
   * Validar la extensión del archivo
   * @param file (File)
   * @memberof UploadFileComponent
   */
  validateExtension(file: File) {
    const ext = file.name.toUpperCase().split('.').pop() || '';
    if (!this.filesAcceps.includes('.' + ext)) {
      this._snackBar.open(`El archivo ${file.name} no es compatible.`, 'Cerrar');
      return false;
    }
    return true;
  }

  /**
   * Validar el tamaño del archivo
   * @param file
   * @returns
   */
  validateSizeFile(file: File) {
    const size = file.size / 1024 / 1024;
    if (size > this.maxFileSizeMB) {
      this._snackBar.open(`El archivo ${file.name} es demasiado grande.`, 'Cerrar');
      return false;
    }
    return true;
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 25;
          }
        }, 250);
      }
    }, 100);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(i: number) {
    this.files.splice(i, 1);
    this.removeOrClearControlFiles(i);
    this.fileDropRef.nativeElement.value = '';
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes = 0, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }



  onSubmitFormFiles() {
    if (this.formUploadFile.invalid || this.files.length == 0 || !this.userEdit) return;

    if(this.profileAuthUser === null) {
      this._snackBar.open('Tenemos problemas, por favor inice sesipon de nuevo', 'Cerrar');
      return
    }
    const formValues = this.formUploadFile.value;
    const customFiles = this.files;

    // Mapea los datos en el formato deseado
    const mappedData: IDataFileAsigned[] = formValues.fileNames.map((control: any, index: number) => {
      const nameCurate = control.fileNameControl.trim();
      const customFile = customFiles[index];
      return {
        nameFile: nameCurate,
        linkFile: customFile,
        idUser: Number(this.userEdit),
        idAdmin: this.profileAuthUser?.id,
      };
    });
    this.asignedFilesToUser(mappedData);
  }


  profileAuthUser$() {
    this._auth.getAuthState$.subscribe((user) => {
      this.profileAuthUser = user;
    });
  }

  asignedFilesToUser(dataFiles: IDataFileAsigned[]) {
    let responseMulti: string[] = [];
    this.isLoadderShow = true;
    dataFiles.forEach((dataFile) => {
      let messageResponse = '';
      this._userService.asignedFileToUser(dataFile).subscribe({
        next: (response: IDataFileAsignedResponse) => {
          if( response.error ) {
            this.isLoadderShow = false;
            messageResponse = `Falló al cargar el archivo ${dataFile.nameFile} \n`;
            responseMulti.push(messageResponse);
            return;
          }
          this.isLoadderShow = false;
          messageResponse = `El archivo ${dataFile.nameFile} fue cargado correctamente \n`;
          responseMulti.push(messageResponse);
        },
        error: (error: Error) => {
          messageResponse = `Falló al cargar el archivo ${dataFile.nameFile} \n`;
          responseMulti.push(messageResponse);
          this.isLoadderShow = false;
        },
        complete: () => {
          const fileNames = this.formUploadFile.get('fileNames') as FormArray;
          fileNames.clear();
          fileNames.controls = [];
          this.formUploadFile.reset();
          this.files = [];
          this._cdr.detectChanges();

          if(responseMulti.length == dataFiles.length ) {
            const resulMessage = responseMulti.join(' ------------ ');
            this._snackBar.open(resulMessage, 'Cerrar', {
              duration: 8000,
            });
            this.uploadeEvent.emit(dataFiles.length);
            return;
          }
          this.isLoadderShow = false;
        }
      });
    });
  }
}
