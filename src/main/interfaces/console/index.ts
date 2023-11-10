import '../../config/module-alias';

import { FindBestPathUseCase } from '@/application';
import { CSVManipulator } from '@/infra';
import { ConsoleInterfaceExecutor } from './ConsoleInterfaceExecutor';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the file path.');
  process.exit(1);
}

async function runApplication() {
  try {
    const routes = await new CSVManipulator().readRoutesFile(filePath);

    if (routes.length) {
      console.log(
        `File reading completed successfully, ${routes.length} routes were processed`,
      );
    }

    const findBestPathUseCase = new FindBestPathUseCase(routes);
    const executor = new ConsoleInterfaceExecutor(findBestPathUseCase);
    executor.run();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}

runApplication();
