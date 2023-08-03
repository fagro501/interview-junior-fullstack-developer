import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityOverviewComponent } from './city-overview.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { SearchComponent } from "../search/search.component";
import { ToastrModule } from "ngx-toastr";

describe('CityOverviewComponent', () => {
  let component: CityOverviewComponent;
  let fixture: ComponentFixture<CityOverviewComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityOverviewComponent, SearchComponent],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(CityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render list', () => {
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ul')?.id).toContain('cityList');
  });
  it('should render list', () => {
    component.getCities("test")
    fixture.whenStable().then(() => {
      let compiled = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();
      let listElements = compiled.querySelectorAll("li");
      expect(listElements.length).toEqual(3)
    })
  });
});
