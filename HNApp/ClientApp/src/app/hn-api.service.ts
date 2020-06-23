import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class HnApiService {

  apiURL: string = 'https://hacker-news.firebaseio.com/v0';
  maxPosts: number = 30;

  constructor(private httpClient: HttpClient) {

  }

  public getLatestStories() {
    let path: string = `${this.apiURL}/topstories.json`;
    return this.httpClient.get<number[]>(path);
  }

  public fetchAPost(post: number) {
    let path = `${this.apiURL}/item/${post.toString()}.json`
    return this.httpClient.get<Post>(path);
  }

}
