import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule } from "@angular/forms";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports:[FormsModule]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.id).toEqual('search');
  });

  it('should dispatch event',() => {
    fixture.detectChanges();
    const inputText = "Berl"

    fixture.whenStable().then(() => {
      let input = fixture.nativeElement.querySelector('input');
      expect(input.value).toBe('');
      input.value = inputText;
      input.dispatchEvent(new Event('input'));
      expect(component.queryString).toHaveBeenCalledWith(inputText);
    });
  });
});
