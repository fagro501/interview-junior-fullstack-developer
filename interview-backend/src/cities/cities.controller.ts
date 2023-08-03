import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { Result } from './result.model';

@Controller('cities')
export class CitiesController {
  constructor(private readonly service: CitiesService) {}

  @Get()
  getCities(
    @Query('query') query: string,
    @Query('page') page: string,
  ): Result {
    const parsedPage: number = parseInt(page);
    if (query == undefined || parsedPage == undefined || isNaN(parsedPage)) {
      throw new HttpException(
        'Parameters not filled or not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.service.getCities(query, parsedPage);
  }
}
