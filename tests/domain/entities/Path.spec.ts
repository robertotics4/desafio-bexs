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

  it('should return formatted path', () => {
    const fakePath: Path = new Path({
      routes: [
        {
          origin: 'GRU',
          destination: 'BRC',
          price: 10,
        },
        {
          origin: 'BRC',
          destination: 'SCL',
          price: 5,
        },
        {
          origin: 'SCL',
          destination: 'ORL',
          price: 20,
        },
        {
          origin: 'ORL',
          destination: 'CDG',
          price: 5,
        },
      ],
      price: 40,
    });

    const result = Path.getFormattedPath(fakePath);

    expect(result).toEqual('GRU - BRC - SCL - ORL - CDG > $40');
  });
});
