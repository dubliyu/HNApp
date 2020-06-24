import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getMainHeading() {
    return element(by.css('app-root h1')).getText();
  }

  getSubHeading() {
    return element(by.css('app-root h3')).getText();
  }

  getStoryCards() {
    return element.all(by.css('.story_card'));
  }
}
