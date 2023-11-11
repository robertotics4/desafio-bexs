import { IFindBestPathUseCase, Path } from '@/domain';
import { Request, Response } from 'express';
import { makeFindBestPathUseCase } from '../factories';

export class FindBestPathController {
  private findBestPathUseCase?: IFindBestPathUseCase;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { origin, destination } = request.body;

    this.findBestPathUseCase = makeFindBestPathUseCase();

    const bestPath = await this.findBestPathUseCase.execute({
      origin,
      destination,
    });

    const result = { bestPath };

    if (bestPath) {
      Object.assign(result, { formatted: Path.getFormattedPath(bestPath) });
    }

    return response.json(result);
  }
}
