import { CreateRouteUseCase } from '@/application';
import { ICreateRouteUseCase, Route } from '@/domain';
import { CSVManipulator, RouteRepositoryInFile } from '@/infra';
import { Request, Response } from 'express';
import { makeCreateRouteUseCase } from '../factories';

export class CreateRouteController {
  private createRouteUseCase?: ICreateRouteUseCase;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { origin, destination, price } = request.body;

    this.createRouteUseCase = makeCreateRouteUseCase();

    const route = new Route({ origin, destination, price });

    const createdRoute = await this.createRouteUseCase.execute(route);

    return response.status(201).json(createdRoute);
  }
}
