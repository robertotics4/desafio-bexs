import { NodeFs } from '@/infra/gateways/fileSystem';
import { Readable } from 'node:stream';

describe('NodeFs', () => {
  let sut: NodeFs;

  beforeEach(() => {
    sut = new NodeFs();
  });

  it('should return a Readable stream from fs.createReadStream', () => {
    const filePath = 'docs/input-file.csv';
    const options = { encoding: 'utf-8' };

    const result = sut.createReadStream(filePath, options);

    expect(result).toBeInstanceOf(Readable);
  });
});
