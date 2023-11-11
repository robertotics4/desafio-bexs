import { Request, Response } from 'express';

import { ListRoutesUseCase } from '@/application';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';

export class ListRoutesController {
  private listRoutesUseCase?: ListRoutesUseCase;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const filePath = process.env.FILE_PATH;

    if (!filePath) {
      return response.status(400).json({ error: 'filePath is required' });
    }

    if (!this.listRoutesUseCase) {
      this.injectDependencies(filePath);
    }

    const result = await this.listRoutesUseCase?.execute();
    return response.json({ count: result?.length, rows: result });
  }

  private injectDependencies(filePath: string): void {
    const csvManipulator = new CSVManipulator();
    const routeRepository = new RouteRepositoryInFile(csvManipulator, filePath);
    this.listRoutesUseCase = new ListRoutesUseCase(routeRepository);
  }
}
