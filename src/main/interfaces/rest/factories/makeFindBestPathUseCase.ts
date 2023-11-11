import { FindBestPathUseCase } from '@/application';
import { IFindBestPathUseCase } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { env } from '@/main/config/env';

export function makeFindBestPathUseCase(): IFindBestPathUseCase {
  const { filePath } = env;
  const csvManipulator = new CSVManipulator();
  const routeRepository = new RouteRepositoryInFile(
    csvManipulator,
    filePath as string,
  );
  return new FindBestPathUseCase(routeRepository);
}
