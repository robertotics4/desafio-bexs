import { Path } from '@/domain/entities';

export namespace FindBestPath {
  export type Input = {
    origin: string;
    destination: string;
  };
}

export interface IFindBestPathUseCase {
  execute({ origin, destination }: FindBestPath.Input): Path | null;
}
