import { CreateRoute, ICreateRouteUseCase, Route } from '@/domain';
import { IRouteRepository } from '@/domain/contracts/gateways';

export class CreateRouteUseCase implements ICreateRouteUseCase {
  constructor(private routeRepository: IRouteRepository) {}

  async execute({ route, filePath }: CreateRoute.Input): Promise<Route> {
    return await this.routeRepository.create(route, filePath);
  }
}
