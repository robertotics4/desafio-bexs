import fs from 'fs/promises';
import { IPromisesFileSystem } from '@/domain/contracts/gateways';

export class PromisesFs implements IPromisesFileSystem {
  async writeFile(filePath: string, data: any, options: any): Promise<void> {
    await fs.writeFile(filePath, data, options);
  }
}
