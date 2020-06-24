import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  isSortByScore: Boolean;
  timeoutTimer: number;

  constructor() { }

  ngOnInit(): void {
    this.isSortByScore = false;
  }

  public toggleSort(){
    this.isSortByScore = !this.isSortByScore;
  }

  public changeTimer(newTimer: number) {
    this.timeoutTimer = newTimer;
    console.log("New time: ", this.timeoutTimer);

  }
}
