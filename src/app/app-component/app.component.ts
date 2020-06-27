import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { without, findIndex } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title: string = 'Indian Life Pet Click and Pet Shop';
  orderBy: string;
  orderType: string;
  lastIndex: number;

  theList: object[];
  modifiedList: object[];

  constructor(private http: HttpClient) {
    this.orderBy = 'petName';
    this.orderType = 'asc';
  }

  ngOnInit(): void {
    this.lastIndex = 0;
    this.http.get<Object[]>('../assets/data.json').subscribe((data) => {
      this.theList = data.map((item: any) => {
        item.aptId = this.lastIndex++;
        return item;
      });
      this.modifiedList = data;
      this.sortItems();
    });
  }

  addApt(theApt: any) {
    theApt.aptId = this.lastIndex;
    this.theList.unshift(theApt);
    this.modifiedList.unshift(theApt);
    this.lastIndex++;
  }

  searchApt(theQuery: string) {
    this.modifiedList = this.theList.filter((eachItem) => {
      return (
        eachItem['petName']
          .toLowerCase()
          .includes(theQuery.toLocaleLowerCase()) ||
        eachItem['ownerName']
          .toLowerCase()
          .includes(theQuery.toLocaleLowerCase()) ||
        eachItem['aptNotes']
          .toLowerCase()
          .includes(theQuery.toLocaleLowerCase())
      );
    });
  }

  updateApt(aptInfo) {
    let aptIndex: number;
    let modifiedIndex: number;

    console.log(aptInfo);

    aptIndex = findIndex(this.theList, { aptId: aptInfo.theApt.aptId });
    modifiedIndex = findIndex(this.modifiedList, { aptId: aptInfo.theApt.aptId });

    this.theList[aptIndex][aptInfo.labelName] = aptInfo.newValue;
    this.modifiedList[modifiedIndex][aptInfo.labelName] = aptInfo.newValue;
  }

  deleteApt(theApt: object) {
    this.theList = without(this.theList, theApt);
    this.modifiedList = without(this.theList, theApt);
  }

  orderApt(orderObject) {
    this.orderBy = orderObject.orderBy;
    this.orderType = orderObject.orderType;

    this.sortItems();
  }

  sortItems() {
    let order: number;

    if (this.orderType === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    this.modifiedList.sort((a, b) => {
      if (a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase()) {
        return -1 * order;
      }
      if (a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase()) {
        return 1 * order;
      }
    });
  }
}
