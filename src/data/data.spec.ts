import { Test, TestingModule } from '@nestjs/testing';
import { Data } from './data';

describe('Data', () => {
  let provider: Data;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Data],
    }).compile();

    provider = module.get<Data>(Data);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
