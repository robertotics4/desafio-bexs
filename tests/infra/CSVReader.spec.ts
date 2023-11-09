import { ICSVReader } from '@/domain';
import { CSVReader } from '@/infra';
import fs from 'fs';

describe('CSVReader', () => {
  let sut: ICSVReader;
  let mockData: string;

  beforeAll(() => {
    mockData = 'GRU,BRC,10\nBRC,SCL,5\nGRU,CDG,75\nGRU,SCL,20';

    fs.writeFileSync('test-routes.csv', mockData);
  });

  beforeEach(() => {
    sut = new CSVReader();
  });

  afterAll(() => {
    fs.unlinkSync('test-routes.csv');
  });

  it('should read routes from a CSV file', async () => {
    const result = await sut.readRoutesFile('test-routes.csv');

    expect(result).toEqual([
      { origin: 'GRU', destination: 'BRC', price: 10 },
      { origin: 'BRC', destination: 'SCL', price: 5 },
      { origin: 'GRU', destination: 'CDG', price: 75 },
      { origin: 'GRU', destination: 'SCL', price: 20 },
    ]);
  });

  // it('should handle errors when reading invalid file', async () => {
  //   try {
  //     await sut.readRoutesFile('non-existent-file.csv');
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(Error);
  //   }
  // });
});
