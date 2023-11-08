import { Route } from './Route';

export class Path {
  routes: Route[];

  price: number;

  constructor({ routes, price }: Path) {
    this.routes = routes;
    this.price = price;
  }
}
