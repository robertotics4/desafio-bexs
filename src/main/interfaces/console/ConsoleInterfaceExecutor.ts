import { FindBestPathUseCase } from '@/application';
import { Path } from '@/domain';
import * as readlineSync from 'readline-sync';

export class ConsoleInterfaceExecutor {
  constructor(private findBestPathUseCase: FindBestPathUseCase) {}

  public async run(): Promise<void> {
    while (true) {
      const input = readlineSync.question(
        'Please enter the route (e.g., GRU-CDG) or type "exit" to quit: ',
      );

      if (input.toLowerCase() === 'exit') {
        break;
      }

      const [origin, destination] = input.split('-');
      const bestPath = this.findBestPathUseCase.execute({
        origin,
        destination,
      });

      if (!origin || !destination) {
        throw new Error(
          'Invalid route format. Please enter the route in the format "DE-PARA" (e.g., GRU-CDG).',
        );
      }

      this.printBestPath(bestPath);
    }
  }

  private printBestPath(path: Path | null): void {
    if (!path) {
      throw new Error('No valid path found.');
    }

    const formattedPath = Path.getFormattedPath(path);
    console.log(`Best route: ${formattedPath} > $${path.price}`);
  }
}
