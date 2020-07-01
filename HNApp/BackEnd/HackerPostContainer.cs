using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Transactions;

namespace HNApp.BackEnd
{

    public class HNPage
    {
        public bool isValid;
        public HackerPost[] stories;
        public int[] posts;
    }

    public class HackerPostContainer
    {
        private static bool TimerIsRunning = false;
        private static System.Timers.Timer timer;
        private static HNPage[] PostCache = new HNPage[20];

        public static bool HardRefresh = false;
        public static int TimerDuration = 5000;

        static HackerPost[] getHackerNewsPage(int page){
            checkFetchTimer();

            // Check page is within bounds, else return last 20
            if(page > 19)
            {
                page = 19;
            }

            if(!PostCache[page].isValid)
            {
                fillPage(page);
            }

            return PostCache[page].stories;
        }

        private static void checkFetchTimer()
        {
            // Check if timer has never been started
            if (!TimerIsRunning)
            {
                fetchAllPosts();
                fillPage(0);
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
            fetchAllPosts();
        }

        private static void fetchAllPosts()
        {
            // Get array of 500 int posts;

            // Break array into 20 pages of 25 stories

            // Compare the new posts with the old posts
                // if one changed mark invalid
                // move stories if ranking changed
                // move post number if ranking changed
                // zero out ids for newly apeared stories

        }

        private static void fillPage(int page)
        {
            // iterate over all post number in PostCache[page].posts

            // if id is 0, then we need to fetch that story
                // parse story
                // fill in blank
        }
    }
}
