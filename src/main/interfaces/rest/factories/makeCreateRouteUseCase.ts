import { CreateRouteUseCase } from '@/application';
import { ICreateRouteUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { NodeFs, PromisesFs } from '@/infra/gateways/fileSystem';
import { env } from '@/main/config/env';

export function makeCreateRouteUseCase(): ICreateRouteUseCase {
  const { filePath } = env;
  const fs = new NodeFs();
  const promisesFs = new PromisesFs();
  const csvManipulator = new CSVManipulator(fs, promisesFs);
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );
  return new CreateRouteUseCase(routeRepository);
}
