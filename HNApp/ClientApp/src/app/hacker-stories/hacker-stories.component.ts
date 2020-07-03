import { Component, OnInit, Inject, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Component({
  selector: 'app-hacker-stories',
  templateUrl: './hacker-stories.component.html',
  styleUrls: ['./hacker-stories.component.css'],
})
export class HackerStoriesComponent implements OnInit {

  // Front End 
  @Input() PerformRefresh: Boolean;
  @Input() SortBy: string;
  @Input() PageNumber: number;

  // Post for ngFor
  public stories: Post[];

  // Private vars
  private base_url: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.base_url = baseUrl;
    this.http = http;
  }

  ngOnInit() {
    let url = this.base_url + `api/HackerPostApi?page=${this.PageNumber}&sortby=${this.SortBy}`
    this.http.get<Post[]>(url).subscribe(result => {
      console.log("Fetched: ", result);
      this.stories = result;
    }, error => console.error("Failed to fetch: ", error));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

}
