import { Route } from '@/domain/entities';

export interface IListRoutesUseCase {
  execute(): Promise<Route[]>;
}
