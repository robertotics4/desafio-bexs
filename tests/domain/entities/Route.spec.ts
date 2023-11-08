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
});
