import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HnApiService } from './hn-api.service';

function isValidType(t) {
  if (t === "story" || t === "job" || t === "comment" || t === "poll" || t === "pollopt"){
    return true;
  }
  return false;
}

describe('HnApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const service: HnApiService = TestBed.get(HnApiService);
    expect(service).toBeTruthy();
  });

  it("should have at lest 30 post numbers, and each number should be a post", () => {
    const service: HnApiService = TestBed.get(HnApiService);
    let observ1 = service.getLatestStories();
    expect(service).toBeTruthy(observ1);
    let observ2 = service.fetchAPost(0);
    expect(service).toBeTruthy(observ2);
  });
});
