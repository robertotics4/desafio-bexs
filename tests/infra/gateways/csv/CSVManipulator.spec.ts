import { ICSVManipulator, Route } from '@/domain';
import { IFileSystem, IPromisesFileSystem } from '@/domain/contracts/gateways';
import { CSVManipulator } from '@/infra';
import { AppError } from '@/main/interfaces/rest/errors';
import { MockProxy, mock } from 'jest-mock-extended';
import { Readable } from 'stream';

describe('CSVManipulator', () => {
  let sut: ICSVManipulator;
  let fileSystemStub: MockProxy<IFileSystem>;
  let promisesFileSystemStub: MockProxy<IPromisesFileSystem>;
  let filePath: string;
  let content: string;
  let options: any;
  let fakeRoute: Route;

  beforeAll(() => {
    fileSystemStub = mock();
    promisesFileSystemStub = mock();

    filePath = 'tests/infra/gateways/csv/CSVManipulatorTest.csv';
    content = 'GRU,BRC,10';
    fakeRoute = new Route({
      origin: 'GRU',
      destination: 'BRC',
      price: 10,
    });

    options = {
      encoding: 'utf8',
    };

    fileSystemStub.createReadStream.mockReturnValue(
      Readable.from(content, options),
    );
  });

  beforeEach(() => {
    sut = new CSVManipulator(fileSystemStub, promisesFileSystemStub);
  });

  describe('readRoutesFile', () => {
    it('should call fileSystem.createReadStream with correct params', async () => {
      await sut.readRoutesFile(filePath);

      expect(fileSystemStub.createReadStream).toHaveBeenCalledWith(filePath, {
        encoding: 'utf8',
      });
      expect(fileSystemStub.createReadStream).toHaveBeenCalledTimes(1);
    });

    it('should return routes on success', async () => {
      fileSystemStub.createReadStream.mockReturnValueOnce(
        Readable.from(content, options),
      );
      const generatedRoutes = [fakeRoute];

      const result = await sut.readRoutesFile(filePath);

      expect(result).toEqual(generatedRoutes);
    });

    it('should throw if readable throws', async () => {
      fileSystemStub.createReadStream.mockReturnValueOnce(
        Readable.from('invalid,invalid,invalid', options),
      );

      try {
        await sut.readRoutesFile(filePath);
      } catch (error) {
        expect(error).toEqual(
          new AppError('Invalid origin or destination (invalid-invalid)'),
        );
      }
    });
  });

  describe('writeRoutesFile', () => {
    it('should call promisesFileSystem.writeFile with correct params', async () => {
      await sut.writeRoutesFile(filePath, [fakeRoute]);

      expect(promisesFileSystemStub.writeFile).toHaveBeenCalledWith(
        filePath,
        content,
        'utf-8',
      );
      expect(promisesFileSystemStub.writeFile).toHaveBeenCalledTimes(1);
    });
  });
});
