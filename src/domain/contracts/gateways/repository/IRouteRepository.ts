import { Route } from '@/domain/entities';

export interface IRouteRepository {
  create(route: Route, filePath: string): Promise<Route>;
  list(filePath: string): Promise<Route[]>;
}
