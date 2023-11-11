import { Route } from '@/domain/entities';

export interface IRouteRepository {
  create(route: Route): Promise<Route>;
  list(): Promise<Route[]>;
}
