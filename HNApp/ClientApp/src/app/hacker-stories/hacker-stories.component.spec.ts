import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerStoriesComponent } from './hacker-stories.component';

describe('HackerStoriesComponent', () => {
  let component: HackerStoriesComponent;
  let fixture: ComponentFixture<HackerStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
