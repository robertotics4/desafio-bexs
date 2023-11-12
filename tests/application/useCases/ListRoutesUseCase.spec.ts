import { MockProxy, mock } from 'jest-mock-extended';
import { IListRoutesUseCase, Route } from '@/domain';
import { IRouteRepository } from '@/domain/contracts/gateways';
import { ListRoutesUseCase } from '@/application';

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

describe('ListRoutesUseCase', () => {
  let sut: IListRoutesUseCase;
  let routeRepositoryStub: MockProxy<IRouteRepository>;
  let fakeRoutes: Route[];

  beforeAll(() => {
    routeRepositoryStub = mock();

    fakeRoutes = makeFakeRoutes();

    routeRepositoryStub.list.mockResolvedValue(fakeRoutes);
  });

  beforeEach(() => {
    sut = new ListRoutesUseCase(routeRepositoryStub);
  });

  it('should call routeRepository.list with correct params', async () => {
    await sut.execute();

    expect(routeRepositoryStub.list).toHaveBeenCalledWith();
    expect(routeRepositoryStub.list).toHaveBeenCalledTimes(1);
  });

  it('should throw if routeRepository.list throws', async () => {
    routeRepositoryStub.list.mockRejectedValueOnce(new Error());

    const promise = sut.execute();

    expect(promise).rejects.toThrow();
  });

  it('should return routes on success', async () => {
    const result = await sut.execute();

    expect(result).toEqual(fakeRoutes);
  });
});
