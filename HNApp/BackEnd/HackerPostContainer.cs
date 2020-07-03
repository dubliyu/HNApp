using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Timers;

namespace HNApp.BackEnd
{

    public class HNpostCacheItem
    {
        public bool hasStory;
        public int id;
        public HackerPost post;

        public HNpostCacheItem(int newid)
        {
            this.id = newid;
            this.hasStory = false;
        }
    }

    public class HackerPostContainer
    {
        static readonly HttpClient client = new HttpClient();

        const string StoryUrl = "https://news.ycombinator.com/item?id=";
        const string PostUrl = "https://hacker-news.firebaseio.com/v0/item/";
        const string Top500Url = "https://hacker-news.firebaseio.com/v0/topstories.json";

        public static bool HardRefresh = false;
        public static List<HNpostCacheItem> Cache = new List<HNpostCacheItem>(); 
        public static int CacheBound = 500;
        public static int PageSize = 18;

        public static async Task RefreshCache()
        {
            Cache.Clear();
            await FetchAllPostsAsync();
        }

        public static HackerPost[] GetHackerNewsPage(int page) {

            CheckCacheForPage(page);
            List<HackerPost> ret = new List<HackerPost>();
            int j = 0;
            for (int i = page * PageSize; i < CacheBound && j < PageSize; i++, j++)
            {
                ret.Add(Cache[i].post);
            }
            return ret.ToArray();
        }

        private static void CheckCacheForPage(int page){
            // We want to get all the missing stories at once
            // This will be faster then getting them individually

            List<Task> fetchStoryList = new List<Task>();
            for(int i = page * PageSize; i < CacheBound; i++)
            {
                if(Cache[i] is null)
                {
                    break;
                }
                if (!Cache[i].hasStory)
                {
                    fetchStoryList.Add(GetStory(i));
                }
            }
            Task.WaitAll(fetchStoryList.ToArray());
        }

        private static async Task FetchAllPostsAsync()
        {
            try
            {
                string responseBody = await client.GetStringAsync(Top500Url);
                int[] top500posts = JsonSerializer.Deserialize<int[]>(responseBody);
                CacheBound = top500posts.Length;

                for (int i=0; i < top500posts.Length; i++)
                {
                    Cache.Add(new HNpostCacheItem(top500posts[i]));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error in fetchAllPostsAsync");
                Console.WriteLine(e.StackTrace);
            }
        }


        private static async Task GetStory(int index)
        {
            try
            {
                string url = PostUrl + Cache[index].id + ".json";
                string responseBody = await client.GetStringAsync(url);
                HackerPost post = JsonSerializer.Deserialize<HackerPost>(responseBody);

                Cache[index].hasStory = true;
                Cache[index].post = post;

                if(post.url is null)
                {
                    post.url = StoryUrl + post.id;
                }

                if(post.title.Contains("Ask HN:"))
                {
                    post.type = "Ask HN";
                }
                else if (post.title.Contains("Show HN:"))
                {
                    post.type = "Show HN";
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error in getStory");
                Console.WriteLine(e.StackTrace);
            }
        }
    }
}
