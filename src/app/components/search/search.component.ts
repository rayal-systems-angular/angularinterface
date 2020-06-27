import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  query: string;

  @Input() orderBy;
  @Input() orderType;
  @Output() queryEvt = new EventEmitter<string>();
  @Output() orderEvt = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleQuery(query: string) {
    this.queryEvt.emit(query);
  }

  handleSort(orderItems) {
    this.orderBy = orderItems.orderBy;
    this.orderType = orderItems.orderType;
    this.orderEvt.emit(orderItems);
  }
}
