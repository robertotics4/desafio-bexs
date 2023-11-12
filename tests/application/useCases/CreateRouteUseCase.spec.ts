import { MockProxy, mock } from 'jest-mock-extended';
import { ICreateRouteUseCase, Route } from '@/domain';
import { IRouteRepository } from '@/domain/contracts/gateways';
import { CreateRouteUseCase } from '@/application';

describe('CreateRouteUseCase', () => {
  let sut: ICreateRouteUseCase;
  let routeRepositoryStub: MockProxy<IRouteRepository>;
  let fakeRoute: Route;

  beforeAll(() => {
    routeRepositoryStub = mock();

    fakeRoute = new Route({ origin: 'GRU', destination: 'CDG', price: 75 });
  });

  beforeEach(() => {
    sut = new CreateRouteUseCase(routeRepositoryStub);
  });

  it('should call routeRepository.create with correct params', async () => {
    await sut.execute(fakeRoute);

    expect(routeRepositoryStub.create).toHaveBeenCalledWith(fakeRoute);
    expect(routeRepositoryStub.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if routeRepository.create throws', async () => {
    routeRepositoryStub.create.mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeRoute);

    expect(promise).rejects.toThrow();
  });

  it('should return route on success', async () => {
    routeRepositoryStub.create.mockResolvedValueOnce(fakeRoute);

    const result = await sut.execute(fakeRoute);

    expect(result).toBeTruthy();
    expect(result).toEqual({ origin: 'GRU', destination: 'CDG', price: 75 });
  });
});
