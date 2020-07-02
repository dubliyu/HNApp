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
  @Input() needSort: Boolean;
  @Input() timeoutTimer: number;
  public stories: Post[];

  private sortby: string = 'alpha';
  private page: number = 2;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let url = baseUrl + `api/HackerPostApi?page=${this.page}&sortby=${this.sortby}`
    http.get<Post[]>(baseUrl + 'api/HackerPostApi').subscribe(result => {
      console.log("Succes: ", result);
      this.stories = result;
    }, error => console.error("Failed to fetch: ", error));
  }

  ngOnInit(){ }

  ngOnChanges(changes: SimpleChanges){ }

}
