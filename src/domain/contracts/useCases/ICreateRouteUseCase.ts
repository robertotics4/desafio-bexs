import { Route } from '@/domain/entities';

export namespace CreateRoute {
  export type Input = {
    route: Route;
    filePath: string;
  };
}

export interface ICreateRouteUseCase {
  execute({ route, filePath }: CreateRoute.Input): Promise<Route>;
}
