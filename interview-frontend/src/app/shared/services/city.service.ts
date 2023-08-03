import { Injectable } from '@angular/core';
import { catchError, Observable, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";


export interface City {
  name: string;
  count: number;
}

export interface CityResult {
  cities: City[];
  count: number;
}

export const BACKEND_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cityUrl: string = "/cities";

  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  getCities(cityName: String, page: number): Observable<CityResult> {
    return this.http.get<CityResult>(`${BACKEND_URL}${this.cityUrl}?query=${cityName}&page=${page}`)
      .pipe(catchError(this.handleError.bind(this)))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Backend could not be reached ${error.name}`;
    }
    this.toast.error(errorMessage, 'Server Error');
    return of({cities: [], count: 0});
  }
}
