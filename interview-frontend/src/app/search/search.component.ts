import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public search: string = "";
  private searchText$ = new Subject<string>();
  @Output() queryString = new EventEmitter<string>();

  ngOnInit() {
    this.searchText$
      .pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(query => {
        this.queryString.emit(query)
      })
  }
  onSearchChange() {
    this.searchText$.next(this.search);
  }
}
