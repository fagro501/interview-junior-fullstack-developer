import { Component } from '@angular/core';
import { City, CityResult, CityService } from "../shared/services/city.service";

@Component({
  selector: 'app-city-overview',
  templateUrl: './city-overview.component.html',
  styleUrls: ['./city-overview.component.scss']
})
export class CityOverviewComponent {
  public cities: City[] = [];
  public total: number = 0;
  public pageNumber: number = 0;
  public displayCount: number = 0;
  private searchString: string = "";
  public loading: boolean = false;

  constructor(private cityService: CityService) {
  }

  onQueryStringChange($event: string) {
    this.cities = [];
    this.pageNumber = 0;
    this.getCities($event);
  }

  getCities(cityName: string) {
    this.searchString = cityName;
    this.loading = true;
    this.cityService.getCities(cityName, this.pageNumber)
      .subscribe((res: CityResult) => {
        this.loading = false;
        res.cities.forEach(city => this.cities.push(city));
        this.displayCount = this.cities.length;
        this.total = res.count;
      })
  }

  getMore() {
    this.pageNumber++;
    this.getCities(this.searchString);
  }
}
