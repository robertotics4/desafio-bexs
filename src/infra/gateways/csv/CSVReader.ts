import { ICSVReader } from '@/domain/contracts/gateways';
import fs from 'node:fs';
import csv from 'csv-parser';
import { Route } from '@/domain/entities';

export class CSVReader implements ICSVReader {
  async readRoutesFile(filePath: string): Promise<Route[]> {
    const routes: Route[] = [];

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

      stream
        .pipe(csv({ headers: ['origin', 'destination', 'price'] }))
        .on('data', (row: any) => {
          const route = new Route(row);
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
}
