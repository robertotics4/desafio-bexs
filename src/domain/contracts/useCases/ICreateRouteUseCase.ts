import { Route } from '@/domain/entities';

export interface ICreateRouteUseCase {
  execute(route: Route): Promise<Route>;
}
