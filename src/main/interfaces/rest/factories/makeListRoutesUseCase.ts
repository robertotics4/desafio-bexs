import { ListRoutesUseCase } from '@/application';
import { IListRoutesUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';

export function makeListRoutesUseCase(): IListRoutesUseCase {
  const filePath = process.env.FILE_PATH;

  const csvManipulator = new CSVManipulator();
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );
  return new ListRoutesUseCase(routeRepository);
}
