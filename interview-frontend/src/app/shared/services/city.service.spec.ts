import {TestBed} from '@angular/core/testing';

import {BACKEND_URL, City, CityResult, CityService} from './city.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";

describe('CityService', () => {
  let service: CityService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [CityService]
    });
    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CityService);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected cities (called once)', () => {
    let expectedCities: City[] = [
      {name: 'aa', count: 1},
      {name: 'a', count: 2},
    ];
    let expectedResult: CityResult = {cities: expectedCities, count: 2}
    service.getCities("a", 0).subscribe(res => {
      expect(res).toEqual(expectedResult);
    })
    const req = httpTestingController.expectOne(BACKEND_URL+service.cityUrl+"?query=a&page=0");
    expect(req.request.method).toEqual('GET');
    req.flush(expectedResult);
  });
})
