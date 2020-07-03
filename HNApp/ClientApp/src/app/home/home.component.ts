import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  PerformRefresh: Boolean;
  SortBy: string;
  PageNumber: number;

  private LastPageNumber: number = 10;
  private PageSize: number = 18;
  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let url = baseUrl + `api/HackerPostApi/MaxStories`;
    this.PageNumber = 0;
    this.SortBy = "score";
    this.baseUrl = baseUrl;
    this.http = http;
    this.http.get<number>(url).subscribe(result => {
      console.log("Number Of Stories: ", result);
      this.LastPageNumber = Math.floor(result / this.PageSize);
    }, error => console.error("Failed to get Max Stories: ", error));
  }

  ngOnInit(): void { }

  public refresh() {
    let url = this.baseUrl + `api/HackerPostApi/TriggerRefresh`;
    this.http.get<number>(url).subscribe(result => {
      console.log("Result of refresh trigger: ", result);
      this.PerformRefresh = true;
    }, error => console.error("Failed to refresh cache: ", error));
  }

  public change_sort(method: string) {
    this.SortBy = method;
  }

  public prev_page() {
    if (this.PageNumber > 0) {
      this.PageNumber--; 
    }
  }

  public next_page() {
    if (this.PageNumber < this.LastPageNumber) {
      this.PageNumber++;
    }
  }
}
