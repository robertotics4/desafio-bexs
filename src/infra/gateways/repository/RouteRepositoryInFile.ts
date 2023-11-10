import { Route } from '@/domain/entities';
import { ICSVManipulator, IRouteRepository } from '@/domain/contracts/gateways';

export class RouteRepositoryInFile implements IRouteRepository {
  constructor(
    private csvManipulator: ICSVManipulator,
    private filePath: string,
  ) {}

  async create(route: Route): Promise<Route> {
    const routes = await this.getAllRoutes();
    routes.push(route);
    await this.csvManipulator.writeRoutesFile(this.filePath, routes);
    return route;
  }

  async list(): Promise<Route[]> {
    return await this.getAllRoutes();
  }

  private async getAllRoutes(): Promise<Route[]> {
    const routes = await this.csvManipulator.readRoutesFile(this.filePath);
    return routes;
  }
}
