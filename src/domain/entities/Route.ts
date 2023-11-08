export class Route {
  origin: string;

  destination: string;

  price: number;

  constructor({ origin, destination, price }: Route) {
    this.origin = origin;
    this.destination = destination;
    this.price = price;
  }
}
