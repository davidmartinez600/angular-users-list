
export interface CustomFile extends File {
  progress: number;
}

export interface IDataFileAsigned {
  nameFile: string;
  linkFile : CustomFile;
  idUser: string;
  idAdmin: string;
}

export interface IDataFileAsignedResponse {
  error: boolean;
  message: string;
}

export interface IDataFileDeleteResponse {
  error: boolean;
  message: string;
}

/**
 * Respuesta del servicio para obtener los archivos de un usuario
 * */
export interface IFilesUserResponse {
  error: boolean;
  files: IFilesResponse;
}

export interface IFilesResponse {
  headers: any;
  original: IFilesOriginal;
  exception: any;
}

export interface IFilesOriginal {
  files: IFiles[];
}

export interface IFiles {
  id: number;
  created_at: string;
  updated_at: string;
  nameFile: string;
  extFile: string;
  linkFile: string;
  sizeFile: number;
  idAdmin: number;
  idUser: number;
  adminMail?: string;
}
