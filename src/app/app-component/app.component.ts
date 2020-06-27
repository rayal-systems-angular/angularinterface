import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { without } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Wisdom Pet Medicine';
  theList: object[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Object[]>('../assets/data.json').subscribe((data) => {
      this.theList = data;
    });
  }

  addApt(theApt: object) {
    this.theList.unshift(theApt);
  }

  searchApt(theQuery: string) {
    console.log(theQuery);
    this.theList = this.theList.filter((eachItem) => {
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

  deleteApt(theApt: object) {
    this.theList = without(this.theList, theApt);
  }
}
