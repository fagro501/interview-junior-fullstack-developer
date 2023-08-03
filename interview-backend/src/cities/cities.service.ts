import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { City } from './cities.model';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Result } from './result.model';

@Injectable()
export class CitiesService {
  getCities(query: string, page: number): Result {
    let cities: City[];
    const pageSize = 5;
    const pages: City[][] = [];
    let count;
    try {
      cities = this.loadAllCities();
      cities = cities.filter((city: City) =>
        city.name.toLowerCase().includes(query.toLowerCase()),
      );
      count = cities.length;
      for (let i = 0; i < cities.length; i += pageSize) {
        pages.push(cities.slice(i, i + pageSize));
      }
    } catch (e) {
      throw new HttpException('Error loading the cities', HttpStatus.NOT_FOUND);
    }
    if (pages.length == 0) {
      throw new HttpException('No data found', HttpStatus.NOT_FOUND);
    }
    if (pages.length <= page) {
      throw new HttpException('No data for this page', HttpStatus.NOT_FOUND);
    }
    return { cities: pages[page], count };
  }

  private loadAllCities(): City[] {
    let cities: City[];
    try {
      const data = readFileSync(join(process.cwd(), '../cities.json'), 'utf-8');
      const jsonData = JSON.parse(data) as any[];
      cities = jsonData.map((city) => new City(city));
    } catch (e) {
      throw new Error('Error parsing json file.');
    }
    return cities;
  }
}
