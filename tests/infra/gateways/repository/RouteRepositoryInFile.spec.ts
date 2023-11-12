import { Route } from '@/domain';
import { ICSVManipulator, IRouteRepository } from '@/domain/contracts/gateways';
import { RouteRepositoryInFile } from '@/infra';
import { MockProxy, mock } from 'jest-mock-extended';

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
describe('RouteRepositoryInFile', () => {
  let sut: IRouteRepository;
  let csvManipulatorStub: MockProxy<ICSVManipulator>;
  let filePath: string;
  let fakeRoutes: Route[];

  beforeAll(() => {
    csvManipulatorStub = mock();
    filePath = 'any_file_path';
    fakeRoutes = makeFakeRoutes();

    csvManipulatorStub.readRoutesFile.mockResolvedValue(fakeRoutes);
  });

  beforeEach(() => {
    sut = new RouteRepositoryInFile(csvManipulatorStub, filePath);
  });

  it('should list routes', async () => {
    const result = await sut.list();

    expect(csvManipulatorStub.readRoutesFile).toHaveBeenCalledWith(filePath);
    expect(csvManipulatorStub.readRoutesFile).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeRoutes);
  });

  it('should create route in file', async () => {
    const route = new Route({ origin: 'GRU', destination: 'CDG', price: 75 });
    const routesToInsert = [...fakeRoutes, route];

    const result = await sut.create(route);

    expect(csvManipulatorStub.readRoutesFile).toHaveBeenCalledWith(filePath);
    expect(csvManipulatorStub.readRoutesFile).toHaveBeenCalledTimes(1);
    expect(csvManipulatorStub.writeRoutesFile).toHaveBeenCalledWith(
      filePath,
      routesToInsert,
    );
    expect(csvManipulatorStub.writeRoutesFile).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ origin: 'GRU', destination: 'CDG', price: 75 });
  });
});
