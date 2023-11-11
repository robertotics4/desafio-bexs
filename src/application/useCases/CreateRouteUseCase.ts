import { ICreateRouteUseCase, Route } from '@/domain';
import { IRouteRepository } from '@/domain/contracts/gateways';

export class CreateRouteUseCase implements ICreateRouteUseCase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(route: Route): Promise<Route> {
    return await this.routeRepository.create(route);
  }
}
