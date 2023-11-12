import '../../config/module-alias';

import { FindBestPathUseCase } from '@/application';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { NodeFs } from '@/infra/gateways/fileSystem';
import { ConsoleInterfaceExecutor } from './ConsoleInterfaceExecutor';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the file path.');
  process.exit(1);
}

async function runApplication(csvPath: string) {
  try {
    const nodeFs = new NodeFs();
    const csvManipulator = new CSVManipulator(nodeFs);
    const routes = await csvManipulator.readRoutesFile(csvPath);

    if (routes.length) {
      console.log(
        `File reading completed successfully, ${routes.length} routes were processed`,
      );
    }

    const routeRepository = new RouteRepositoryInFile(csvManipulator, csvPath);
    const findBestPathUseCase = new FindBestPathUseCase(routeRepository);
    const executor = new ConsoleInterfaceExecutor(findBestPathUseCase);
    executor.run();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}

runApplication(filePath);
