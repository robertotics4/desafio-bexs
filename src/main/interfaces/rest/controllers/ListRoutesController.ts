import { Request, Response } from 'express';

import { IListRoutesUseCase } from '@/domain';
import { makeListRoutesUseCase } from '../factories/makeListRoutesUseCase';

export class ListRoutesController {
  private listRoutesUseCase?: IListRoutesUseCase;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response): Promise<Response> {
    this.listRoutesUseCase = makeListRoutesUseCase();

    const result = await this.listRoutesUseCase.execute();
    return response.json({ count: result?.length, rows: result });
  }
}
