export class Post {
  id: number;
  type: string;
  by: string;
  title: string;
  url: string;
  score: number;

  constructor(id, type, by, title, url, score) {
    this.id = id;
    this.type = type;
    this.by = by;
    this.title = title;
    this.url = url;
    this.score = score;
  }
}
