import { Component, OnInit, Inject, Input, SimpleChanges } from '@angular/core';
import { Post } from '../models/post';
import { HnApiService } from '../hn-api.service';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-hacker-stories',
  templateUrl: './hacker-stories.component.html',
  styleUrls: ['./hacker-stories.component.css'],
})
export class HackerStoriesComponent implements OnInit {

  @Input() needSort: Boolean;
  @Input() timeoutTimer: number;

  public stories: Post[];
  public posts: number[];
  private reloadByTimer: Boolean;
  private initialLoad: boolean;
  private oldTimeout: number;
  private timeout;

  constructor(
    public client: HnApiService) {

    this.reloadByTimer = false;
    this.initialLoad = true;
    this.posts = [];
    this.stories = [];

    this.timeout = setInterval(() => {
      this.reloadByTimer = true;
      this.ngOnInit();
    }, 5 * 60 * 1000);

    console.log(this.timeoutTimer * 60 * 1000);

    this.oldTimeout = this.timeoutTimer;
  }

  private SortifNecessary() {
    if (this.needSort) {
      // Sort by ascedning score
      this.stories.sort((first, second) => {
        return first.score < second.score ? 1 : -1;
      });
    }
    else {
      // return to the order in post array
      let newStoryArr = [];

      for (let i = 0; i < this.posts.length && this.stories.length > 0; i++) {
        let tmpStory = {};
        let tmpIndex = 0;

        for (let j = 0; j < this.stories.length; j++) {
          if (this.stories[j].id === this.posts[i]) {
            tmpStory = this.stories[j];
            tmpIndex = j;
            break;
          }
        }

        this.stories.splice(tmpIndex, 0);
        newStoryArr.push({...tmpStory});
      }
      this.stories = newStoryArr;
    }
  }

  private LoadStories() {
    // Get the observable that returns the top stories
    this.client.getLatestStories().subscribe((retPost: number[]) => {

      // For each top story
      for (let i: number = 0; i < this.client.maxPosts && i < retPost.length; i++) {

        // Check if post is allready a known story
        if (this.posts.indexOf(retPost[i]) === -1) {
          // fetch the new story
          this.client.fetchAPost(retPost[i]).subscribe((retStory) => {

            // check if no url is present, then redirect to post itself
            if (retStory.url === undefined) {
              retStory.url = "https://news.ycombinator.com/item?id=" + retPost[i];
            }

            this.stories.unshift(retStory);
            this.posts.unshift(retPost[i]);

            // Sort if necessary
            this.SortifNecessary();
          });
        }
      }
    });
  }

  ngOnInit(){

    // Reload posts
    if (this.posts.length == 0 && this.stories.length == 0 && this.initialLoad) {
      this.initialLoad = false;
      console.log("LOADING");
      this.LoadStories();
    }
    else if (this.reloadByTimer) {
      console.log("RELOADING");
      this.LoadStories();
      this.reloadByTimer = false;
    }
    else {
      // Sort if necessary
      console.log("SORTING INSTEAD");
      this.SortifNecessary();
    }
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("TRIGGER CHANGES");
    if (this.oldTimeout !== this.timeoutTimer) {
      // Cancel timeout
      clearInterval(this.timeout);

      // Create new timeout
      this.timeout = setInterval(() => {
        this.reloadByTimer = true;
        this.ngOnInit();
      }, this.timeoutTimer * 60 * 1000);
      console.log("Setting new timer for: ", this.timeoutTimer);

      this.oldTimeout = this.timeoutTimer;
    }
    else {
      this.ngOnInit();
    }
  }

}
