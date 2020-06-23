import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { HnApiService } from '../hn-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hacker-stories',
  templateUrl: './hacker-stories.component.html',
  styleUrls: ['./hacker-stories.component.css']
})
export class HackerStoriesComponent implements OnInit {

  public stories: Post[];
  public posts: number[];

  constructor(public client: HnApiService) {}

  ngOnInit(): void {
    // Get the observable that returns the top stories
    this.client.getLatestStories().subscribe((retPost: number[]) => {

      this.stories = [];

      // For each top story
      for (let i: number = 0; i < this.client.maxPosts && i < retPost.length; i++) {
        this.client.fetchAPost(retPost[i]).subscribe((retStory) => {
          this.stories.push(retStory);
        });
      }

      // Save the posts numbers just in case
      this.posts = retPost;
    });
  }

}
