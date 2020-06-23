import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-hacker-stories',
  templateUrl: './hacker-stories.component.html',
  styleUrls: ['./hacker-stories.component.css']
})
export class HackerStoriesComponent implements OnInit {

  stories: Post[];

  constructor() { }

  ngOnInit(): void {
    // tmp data
    let tmpA = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 10);
    let tmpB = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 20);
    let tmpC = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 30);
    let tmpD = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 10);
    let tmpE = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 20);
    let tmpF = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 30);
    let tmpG = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 10);
    let tmpH = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 20);
    let tmpI = new Post("story", "calebporzio", "I Just Hit $100k/yr On GitHub Sponsors",
      "https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it", 30);

    this.stories = [tmpA, tmpB, tmpC, tmpE, tmpD, tmpF, tmpG, tmpH, tmpI];
  }

}
