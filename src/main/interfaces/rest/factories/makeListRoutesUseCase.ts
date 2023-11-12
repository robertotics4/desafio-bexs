import { ListRoutesUseCase } from '@/application';
import { IListRoutesUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { NodeFs, PromisesFs } from '@/infra/gateways/fileSystem';
import { env } from '@/main/config/env';

export function makeListRoutesUseCase(): IListRoutesUseCase {
  const { filePath } = env;
  const fs = new NodeFs();
  const promisesFs = new PromisesFs();
  const csvManipulator = new CSVManipulator(fs, promisesFs);
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );
  return new ListRoutesUseCase(routeRepository);
}
