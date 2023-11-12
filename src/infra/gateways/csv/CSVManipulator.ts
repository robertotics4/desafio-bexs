import csv from 'csv-parser';
import { Route } from '@/domain/entities';
import {
  ICSVManipulator,
  IFileSystem,
  IPromisesFileSystem,
} from '@/domain/contracts/gateways';

export class CSVManipulator implements ICSVManipulator {
  constructor(
    private fileSystem: IFileSystem,
    private promisesFileSystem: IPromisesFileSystem,
  ) {}

  async readRoutesFile(filePath: string): Promise<Route[]> {
    const routes: Route[] = [];

    return new Promise((resolve, reject) => {
      const stream = this.fileSystem.createReadStream(filePath, {
        encoding: 'utf8',
      });

      stream
        .pipe(csv({ headers: ['origin', 'destination', 'price'] }))
        .on('data', (row: any) => {
          const route = new Route({
            origin: row.origin,
            destination: row.destination,
            price: Number(row.price),
          });
          routes.push(route);
        })
        .on('end', () => {
          resolve(routes);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }

  async writeRoutesFile(filePath: string, routes: Route[]): Promise<void> {
    const csvData = routes
      .map(route => `${route.origin},${route.destination},${route.price}`)
      .join('\n');
    await this.promisesFileSystem.writeFile(filePath, csvData, 'utf-8');
  }
}
