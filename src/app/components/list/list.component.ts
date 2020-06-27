import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input() aptList;
  @Output() deleteEvt = new EventEmitter();

  faTimes = faTimes;

  constructor() {}

  handleDelete(theApt: object) {
    this.deleteEvt.emit(theApt);
  }
}
