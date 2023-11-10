import { Route } from '@/domain/entities';

export interface ICSVManipulator {
  readRoutesFile(filePath: string): Promise<Route[]>;
  writeRoutesFile(filePath: string, routes: Route[]): Promise<void>;
}
