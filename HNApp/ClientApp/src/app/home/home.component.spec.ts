import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default properties', () => {
    expect(component).toBeTruthy();

    expect(component.PageNumber).toBe(0);
    expect(component.SortBy).toBe("score");
    expect(component.PerformRefresh).toBeFalsy();

  });

  it('should change sort by on function call', () => {
    let old_sort: string = component.SortBy;
    expect(component.SortBy).toBe("score");
    component.change_sort("alpha");
    expect(component.SortBy).toBe("alpha");
  });

  it('should change change page number on function call', () => {
    let pg_num: number = component.PageNumber;
    component.next_page();
    expect(component.PageNumber).toBe(pg_num + 1);

    component.prev_page();
    expect(component.PageNumber).toBe(pg_num - 1);
  });

  it('should have three options in the select', () => {
    // Do something
  });
});
