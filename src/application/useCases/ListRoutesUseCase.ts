import { IListRoutesUseCase, Route } from '@/domain';
import { IRouteRepository } from '@/domain/contracts/gateways';

export class ListRoutesUseCase implements IListRoutesUseCase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(): Promise<Route[]> {
    return await this.routeRepository.list();
  }
}
