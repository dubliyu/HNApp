import { AppPage } from './app.po';
import { by } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title and subheading', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Hacker News');
    expect(page.getSubHeading()).toEqual('Carlos Leon');
  });

  it('contains 30 story cards after 5 seconds', (done) => {
    page.navigateTo();

    setTimeout(() => {
      let stories = page.getStoryCards();

      expect(stories.count()).toEqual(30);

      done();
    }, 5000);

  });
});
