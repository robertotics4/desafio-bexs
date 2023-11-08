import {
  FindBestPath,
  IFindBestPathUseCase,
} from '@/domain/contracts/useCases';
import { Path, Route } from '@/domain/entities';

export class FindBestPathUseCase implements IFindBestPathUseCase {
  private routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
  }

  execute({ origin, destination }: FindBestPath.Input): Path | null {
    const bestPaths: { [key: string]: Path } = {};
    bestPaths[origin] = { routes: [], price: 0 };

    const queue: string[] = [origin];

    while (queue.length > 0) {
      const currentLocation = queue.shift() as string;

      for (const route of this.routes) {
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
