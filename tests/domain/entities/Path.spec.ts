import { Path, Route } from '@/domain';

describe('Path entity', () => {
  it('should create a Path instance with correct properties', () => {
    const fakeRoute = new Route({
      origin: 'GRU',
      destination: 'BRC',
      price: 10,
    });

    const pathData: Path = {
      price: 100,
      routes: [fakeRoute],
    };

    const path = new Path(pathData);

    expect(path).toEqual(pathData);
  });
});
