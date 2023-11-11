import { AppError } from '@/main/interfaces/rest/errors';

export class Route {
  origin: string;

  destination: string;

  price: number;

  constructor({ origin, destination, price }: Route) {
    if (Route.isValidLocation(origin) && Route.isValidLocation(destination)) {
      this.origin = origin;
      this.destination = destination;
      this.price = price;
    } else {
      throw new AppError(
        `Invalid origin or destination (${origin}-${destination})`,
      );
    }
  }

  static isValidLocation(location: string) {
    const regex = /^[A-Z]{3}$/;
    return regex.test(location);
  }
}
