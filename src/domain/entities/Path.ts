import { Route } from './Route';

export class Path {
  routes: Route[];

  price: number;

  constructor({ routes, price }: Path) {
    this.routes = routes;
    this.price = price;
  }

  static getFormattedPath(path: Path): string {
    const uniqueLocations = Array.from(
      new Set(
        path.routes.flatMap((route: Route) => [
          route.origin,
          route.destination,
        ]),
      ),
    );
    const formattedPath = uniqueLocations.join(' - ');

    return formattedPath;
  }
}
