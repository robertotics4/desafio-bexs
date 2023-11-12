import { MockProxy, mock } from 'jest-mock-extended';
import { FindBestPath, IFindBestPathUseCase, Route } from '@/domain';
import { IRouteRepository } from '@/domain/contracts/gateways';
import { FindBestPathUseCase } from '@/application';
import { AppError } from '@/main/interfaces/rest/errors';

export function makeFakeRoutes(): Route[] {
  const data: string[] = [
    'GRU,BRC,10',
    'BRC,SCL,5',
    'GRU,CDG,75',
    'GRU,SCL,20',
    'GRU,ORL,56',
    'ORL,CDG,5',
    'SCL,ORL,20',
  ];

  const routes: Route[] = [];

  for (const line of data) {
    const [origin, destination, priceStr] = line.split(',');
    const price = parseInt(priceStr, 10);
    const obj = { origin, destination, price };
    routes.push(obj);
  }

  return routes;
}

describe('FindBestPathUseCase', () => {
  let sut: IFindBestPathUseCase;
  let routeRepositoryStub: MockProxy<IRouteRepository>;
  let fakeInput: FindBestPath.Input;
  let fakeRoutes: Route[];

  beforeAll(() => {
    routeRepositoryStub = mock();

    fakeInput = {
      origin: 'GRU',
      destination: 'CDG',
    };

    fakeRoutes = makeFakeRoutes();

    routeRepositoryStub.list.mockResolvedValue(fakeRoutes);
  });

  beforeEach(() => {
    sut = new FindBestPathUseCase(routeRepositoryStub);
  });

  it('should call routeRepository.list with correct params', async () => {
    await sut.execute(fakeInput);

    expect(routeRepositoryStub.list).toHaveBeenCalledWith();
    expect(routeRepositoryStub.list).toHaveBeenCalledTimes(1);
  });

  it('should throw if routeRepository.list throws', async () => {
    routeRepositoryStub.list.mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeInput);

    expect(promise).rejects.toThrow();
  });

  it('should throw if there are no registered routes', async () => {
    routeRepositoryStub.list.mockResolvedValueOnce([]);

    const promise = sut.execute(fakeInput);

    expect(promise).rejects.toEqual(
      new AppError('There are no registered routes'),
    );
  });

  it('should return the best path on success', async () => {
    const result = await sut.execute(fakeInput);

    expect(result).toEqual({
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
  });

  it('should return null if best path non exists', async () => {
    const result = await sut.execute({ origin: 'GRU', destination: 'XXX' });

    expect(result).toBe(null);
  });
});
