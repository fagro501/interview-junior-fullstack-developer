import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('parse json file works', () => {
    const result = service.getCities('', 0);
    expect(result.cities.length).toBe(5);
    expect(result.count).toBe(100);
  });
  it('return only Berlin', () => {
    const result = service.getCities('Berlin', 0);
    expect(result.cities.length).toBe(1);
    expect(result.cities[0].name).toBe('Berlin');
  });
  it('page out of bound', () => {
    expect(() => service.getCities('Berlin', 1)).toThrow(
      'No data for this page',
    );
  });
});
