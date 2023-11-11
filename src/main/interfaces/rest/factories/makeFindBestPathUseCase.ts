import { FindBestPathUseCase } from '@/application';
import { IFindBestPathUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';

export function makeFindBestPathUseCase(): IFindBestPathUseCase {
  const filePath = process.env.FILE_PATH;
  const csvManipulator = new CSVManipulator();
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );

  return new FindBestPathUseCase(routeRepository);
}
