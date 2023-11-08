import { Route } from '@/domain/entities';

describe('Route entity', () => {
  it('should create a Route instance with correct properties', () => {
    const routeData = {
      origin: 'GRU',
      destination: 'BRC',
      price: 10,
    };

    const route = new Route(routeData);

    expect(route).toEqual(routeData);
  });

  it('should throw on invalid origin or destination', () => {
    const routeData = {
      origin: 'GRU1',
      destination: 'BRC',
      price: 10,
    };

    expect(() => {
      const route = new Route(routeData);
    }).toThrowError(
      new Error(
        `Invalid origin or destination (${routeData.origin}-${routeData.destination})`,
      ),
    );
  });
});
