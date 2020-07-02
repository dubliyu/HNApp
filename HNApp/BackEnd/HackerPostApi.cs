using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
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
                return -1;
            }
            else if(hx.score > hy.score)
            {
                return 1;
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
        public async Task<IEnumerable<HackerPost>> GetAsync([FromQuery] int page, [FromQuery] string sortby){
            // Get from HackerPostContainer
            HackerPost[] posts = await HackerPostContainer.getHackerNewsPageAsync(page);

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
    }
}
