export class Post {
  type: string;
  by: string;
  title: string;
  url: string;
  score: number;

  constructor(type, by, title, url, score) {
    this.type = type;
    this.by = by;
    this.title = title;
    this.url = url;
    this.score = score;
  }
}
