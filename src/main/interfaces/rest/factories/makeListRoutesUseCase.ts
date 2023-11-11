import { ListRoutesUseCase } from '@/application';
import { IListRoutesUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { env } from '@/main/config/env';

export function makeListRoutesUseCase(): IListRoutesUseCase {
  const { filePath } = env;
  const csvManipulator = new CSVManipulator();
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );
  return new ListRoutesUseCase(routeRepository);
}
