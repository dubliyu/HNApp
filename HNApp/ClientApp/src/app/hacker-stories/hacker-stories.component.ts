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

  public stories: Post[];
  public posts: number[];
  private reloadByTimer: Boolean;
  private TIMER = 300000; //300000 =  1000mil sec * 60 sec * 5 min
  private initialLoad: boolean;

  constructor(
    public client: HnApiService) {

    this.reloadByTimer = false;
    this.initialLoad = true;
    this.posts = [];
    this.stories = [];

    setInterval(() => {
      this.ngOnInit();
    }, this.TIMER);
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
          console.log("Comparing ids: ", this.stories[j].id, " and ", this.posts[i]);
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
      console.log(newStoryArr);
      console.log("new Story array length: ", this.stories.length);
    }
  }

  private LoadStories() {
    // Get the observable that returns the top stories
    this.client.getLatestStories().subscribe((retPost: number[]) => {

      // For each top story
      for (let i: number = 0; i < this.client.maxPosts && i < retPost.length; i++) {

        // Check if post is allready a known story
        if (!(retPost[i] in this.posts)) {
          // fetch the new story
          this.client.fetchAPost(retPost[i]).subscribe((retStory) => {

            // check if no url is present, then redirect to post itself
            if (retStory.url === undefined) {
              retStory.url = "https://news.ycombinator.com/item?id=" + retPost[i];
            }

            this.stories.push(retStory);
          });

          this.posts.push(retPost[i]);
        }
      }

      // Sort if necessary
      this.SortifNecessary();
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
    }
    else {
      // Sort if necessary
      console.log("SORTING INSTEAD");
      this.SortifNecessary();
    }
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("TRIGGER CHANGES");
    this.ngOnInit();
  }

}
