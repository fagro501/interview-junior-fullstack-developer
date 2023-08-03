import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './cities.model';
import { count } from 'rxjs';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    service = new CitiesService();
    controller = new CitiesController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of cities', async () => {
    const city = new City({ count: 1, cityName: 'test', uuid: '123' });
    const result = { cities: [city], count: 1 };
    jest.spyOn(service, 'getCities').mockImplementation(() => result);

    expect(await controller.getCities('test', '0')).toBe(result);
  });
});
