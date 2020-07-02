using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Transactions;

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

        private static bool TimerIsRunning = false;
        private static System.Timers.Timer timer;

        const string StoryUrl = "https://news.ycombinator.com/item?id=";
        const string PostUrl = "https://hacker-news.firebaseio.com/v0/item/";
        const string Top500Url = "https://hacker-news.firebaseio.com/v0/topstories.json";

        public static bool HardRefresh = false;
        public static int TimerDuration = 5000;
        public static HNpostCacheItem[] Cache = new HNpostCacheItem[500]; // up to 500

        public static async Task<HackerPost[]> getHackerNewsPageAsync(int page) {
            await checkFetchTimer();

            // Get 25 stories for this page from the cache
            checkCacheForPage(page);
            HackerPost[] ret = new HackerPost[25];
            int j = 0;
            for (int i = page * 25; i < Cache.Length && j < 25; i++, j++)
            {
                ret[j++] = Cache[i].post;
            }

            return ret;
        }

        private static void checkCacheForPage(int page){
            // We want to get all the missing stories at once
            // This will be faster then getting them individually

            List<Task> fetchStoryList = new List<Task>();
            for(int i = page* 25; i <Cache.Length; i++)
            {
                if(Cache[i] is null)
                {
                    break;
                }
                if (!Cache[i].hasStory)
                {
                    fetchStoryList.Add(getStory(i));
                }
            }
            Task.WaitAll(fetchStoryList.ToArray());
        }


        private static async Task checkFetchTimer()
        {
            // Check if timer has never been started
            if (!TimerIsRunning)
            {
                await fetchAllPostsAsync();
                TimerIsRunning = true;
                setFetchTimer();
            }
            // Check if a timer refresh is waranted
            if (HardRefresh)
            {
                timer.Dispose();
                setFetchTimer();
                HardRefresh = false;
            }
        }

        private static void setFetchTimer()
        {
            timer = new System.Timers.Timer(TimerDuration);
            timer.Elapsed += fetchOnTimer;
            timer.AutoReset = true;
            timer.Enabled = true;
        }

        private static void fetchOnTimer(object sender, ElapsedEventArgs e)
        {
            // We dont need to wait for this to finish
            fetchAllPostsAsync();
        }

        private static async Task fetchAllPostsAsync()
        {
            // Get array of 500 int posts;
            try
            {
                string responseBody = await client.GetStringAsync(Top500Url);
                int[] top500posts = JsonSerializer.Deserialize<int[]>(responseBody);

                for(int i=0; i < top500posts.Length; i++)
                {
                    if(Cache[i] == null)
                    {
                        Cache[i] = new HNpostCacheItem(top500posts[i]);
                    }
                    else
                    {
                        // Check if at this rank is the same story as before
                        if (Cache[i].id != top500posts[i])
                        {
                            if (Cache[i].hasStory)
                            {
                                tryToSaveStory(i, top500posts);
                            }
                            else
                            {
                                // if we never fecthed a story for this post
                                // just overwrite it
                                Cache[i].id = top500posts[i];
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
        }

        private static void tryToSaveStory(int index, int[] top500)
        {
            // At index there is a post with a story that was fetched
            // That story has been moved up or down, or off the list
            // See if old exists inside top500
            for(int i=0; i < top500.Length; i++)
            {
                if(top500[i] == Cache[index].id)
                {
                    // The old story is still in the top 500
                    // Before we replace teh post at position i
                    // check if position i had a story, if so this one has
                    // been moved as well, try to save it.
                    if (Cache[i].hasStory)
                    {
                        tryToSaveStory(i, top500);
                    }
                    
                    // Replace
                    Cache[i].id = Cache[index].id;
                    Cache[i].hasStory = Cache[index].hasStory;
                    Cache[i].post = Cache[index].post;
                }
            }
        }

        private static async Task getStory(int index)
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
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
        }
    }
}
