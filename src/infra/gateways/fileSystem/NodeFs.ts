import { Readable } from 'stream';
import fs from 'node:fs';
import { IFileSystem } from '@/domain/contracts/gateways';

export class NodeFs implements IFileSystem {
  createReadStream(filePath: string, options: any): Readable {
    return fs.createReadStream(filePath, options);
  }
}
