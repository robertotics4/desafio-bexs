import { CreateRouteUseCase } from '@/application';
import { ICreateRouteUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';

export function makeCreateRouteUseCase(): ICreateRouteUseCase {
  const filePath = process.env.FILE_PATH;

  const csvManipulator = new CSVManipulator();
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );
  return new CreateRouteUseCase(routeRepository);
}
