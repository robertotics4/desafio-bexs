import { Route } from '@/domain/entities';

export interface IListRoutesUseCase {
  execute(filePath: string): Promise<Route[]>;
}
