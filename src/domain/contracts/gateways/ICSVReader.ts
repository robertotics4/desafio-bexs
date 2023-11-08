import { Route } from '@/domain/entities';

export interface ICSVReader {
  readRoutesFile(filePath: string): Promise<Route[]>;
}
