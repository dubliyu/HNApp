import { Post } from './post';

describe('Post', () => {
  it('should create an instance of Post', () => {
    expect(new Post("", "", "", "", 0)).toBeTruthy();
  });
});
