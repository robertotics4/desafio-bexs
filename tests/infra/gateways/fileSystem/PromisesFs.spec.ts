import { IPromisesFileSystem } from '@/domain/contracts/gateways';
import { PromisesFs } from '@/infra/gateways/fileSystem';
import { MockProxy, mock } from 'jest-mock-extended';

describe('PromisesFs', () => {
  let sut: PromisesFs;
  let filePath: string;
  let options: string;
  let data: string;

  beforeAll(() => {
    filePath = 'docs/input-file.csv';
    options = 'utf-8';
    data = 'any_data';
  });

  beforeEach(() => {
    sut = new PromisesFs();
  });

  it('should resolve the promise when fs.promises.writeFile is successful', async () => {
    const resultPromise = sut.writeFile(filePath, data, options);

    await expect(resultPromise).resolves.toBeUndefined();
  });

  it('should reject the promise when fsPromises.writeFile throws an error', async () => {
    const fsPromisesMock: MockProxy<IPromisesFileSystem> = mock();
    fsPromisesMock.writeFile.mockRejectedValueOnce(
      new Error('File write error'),
    );

    const promise = fsPromisesMock.writeFile(filePath, data, options);

    await expect(promise).rejects.toThrow('File write error');
  });
});
