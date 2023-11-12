export interface IPromisesFileSystem {
  writeFile(filePath: string, data: any, options: any): Promise<void>;
}
