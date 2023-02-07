export interface File {
  name: string;
  size: string;
}

export interface State {
  files: File[];
}
export interface Events {
  getFiles: never;
  setFiles: File[];
}
