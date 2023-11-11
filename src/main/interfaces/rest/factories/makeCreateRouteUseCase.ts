import { CreateRouteUseCase } from '@/application';
import { ICreateRouteUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { env } from '@/main/config/env';

export function makeCreateRouteUseCase(): ICreateRouteUseCase {
  const { filePath } = env;
  const csvManipulator = new CSVManipulator();
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );
  return new CreateRouteUseCase(routeRepository);
}
