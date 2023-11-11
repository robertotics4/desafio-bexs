import { IRouteRepository } from '@/domain/contracts/gateways';
import {
  FindBestPath,
  IFindBestPathUseCase,
} from '@/domain/contracts/useCases';
import { Path } from '@/domain/entities';
import { AppError } from '@/main/interfaces/rest/errors';

export class FindBestPathUseCase implements IFindBestPathUseCase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute({
    origin,
    destination,
  }: FindBestPath.Input): Promise<Path | null> {
    const routes = await this.routeRepository.list();

    if (!routes.length) {
      throw new AppError('There are no registered routes');
    }

    const bestPaths: { [key: string]: Path } = {};
    bestPaths[origin] = { routes: [], price: 0 };

    const queue: string[] = [origin];

    while (queue.length > 0) {
      const currentLocation = queue.shift() as string;

      for (const route of routes) {
        if (route.origin === currentLocation) {
          const newPath: Path = {
            routes: bestPaths[currentLocation].routes.concat(route),
            price: bestPaths[currentLocation].price + Number(route.price),
          };

          if (
            !bestPaths[route.destination] ||
            newPath.price < bestPaths[route.destination].price
          ) {
            bestPaths[route.destination] = newPath;
            queue.push(route.destination);
          }
        }
      }
    }

    const bestPath = bestPaths[destination];

    if (!bestPath) {
      return null;
    }

    return bestPath;
  }
}
