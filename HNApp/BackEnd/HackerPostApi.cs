using System;
using System.Collections;
using System.Collections.Generic;
using HNApp.BackEnd;
using Microsoft.AspNetCore.Mvc;

namespace HNApp
{

    public class CompareByScore: IComparer
    {
        public int Compare(object x, object y)
        {
            HackerPost hx = (HackerPost)x;
            HackerPost hy = (HackerPost)y;

            if(hx.score < hy.score)
            {
                return 1;
            }
            else if(hx.score > hy.score)
            {
                return -1;
            }
            else
            {
                return 0;
            }
        }
    }

    public class CompareByAlpha : IComparer
    {
        public int Compare(object x, object y)
        {
            HackerPost hx = (HackerPost)x;
            HackerPost hy = (HackerPost)y;

            return hx.title.CompareTo(hy.title);
        }
    }



    [Route("api/[controller]")]
    [ApiController]
    public class HackerPostApi : ControllerBase
    {
        // GET: api/<hackerPost>
        [HttpGet]
        public IEnumerable<HackerPost> Get([FromQuery] int page, [FromQuery] string sortby){
            // Get from HackerPostContainer
            HackerPost[] posts = HackerPostContainer.getHackerNewsPage(page);

            // Sort if 
            if(sortby == "score")
            {
                // Return sorted by score
                IComparer byScore = new CompareByScore();
                Array.Sort(posts, byScore);
            }
            else if(sortby == "alpha")
            {
                // Return alphabetical order
                IComparer byAlpha = new CompareByAlpha();
                Array.Sort(posts, byAlpha);
            }
            // else Return natural order

            // Return
            return posts;
        }

        // GET: api/<hackerPost>/MaxStories
        [HttpGet("MaxStories")]
        public int GetMaxStories()
        {
            // Get the Cache size from HackerPostContainer
            int cacheSize = HackerPostContainer.CacheBound;
            return cacheSize;
        }

        // GET: api/<hackerPost>/MaxStories
        [HttpGet("TriggerRefresh")]
        public bool GetTriggerRefresh()
        {
            // Trigger a refresh of the HackerPostContainer 
            HackerPostContainer.HardRefresh = true;
            HackerPostContainer.checkFetchTimer();
            return true;
        }
    }


}
