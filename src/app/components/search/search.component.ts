import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  query: string;
  @Output() queryEvt = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleQuery(query: string) {
    this.queryEvt.emit(query);
  }
}