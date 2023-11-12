import { Readable } from 'node:stream';

export interface IFileSystem {
  createReadStream(filePath: string, options: any): Readable;
}
