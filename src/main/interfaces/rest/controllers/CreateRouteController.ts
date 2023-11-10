import { CreateRouteUseCase } from '@/application';
import { Route } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { Request, Response } from 'express';

export class CreateRouteController {
  private createRouteUseCase?: CreateRouteUseCase;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { origin, destination, price, filePath } = request.body;

    if (!filePath) {
      return response.status(400).json({ error: 'filePath is required' });
    }

    if (!this.createRouteUseCase) {
      this.injectDependencies(filePath);
    }

    const route = new Route({ origin, destination, price });

    const createdRoute = await this.createRouteUseCase?.execute({
      route,
      filePath,
    });

    return response.status(201).json(createdRoute);
  }

  private injectDependencies(filePath: string): void {
    const csvManipulator = new CSVManipulator();
    const routeRepository = new RouteRepositoryInFile(csvManipulator, filePath);
    this.createRouteUseCase = new CreateRouteUseCase(routeRepository);
  }
}
