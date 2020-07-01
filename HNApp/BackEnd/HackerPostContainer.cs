using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Transactions;

namespace HNApp.BackEnd
{
    public class HackerPostContainer
    {
        private static Boolean TimerIsRunning = false;
        private static System.Timers.Timer timer;

        public static Boolean HardRefresh = false;
        public static int TimerDuration = 5000;

        internal static HackerPost[] getHackerNewsPage(int page){
            // Check the fetch timer is running
            checkFetchTimer();

            // Check page is within bounds, else return last 20
            if(page > 20)
            {
                page = 20;
            }

            // Return posts

            throw new NotImplementedException();
        }

        internal static void checkFetchTimer()
        {
            // Check the timer is running or a timer refresh is waranted
            if (!TimerIsRunning || HardRefresh)
            {
                timer.Dispose();
                timer = new System.Timers.Timer(TimerDuration);
                timer.Elapsed += fetchFromhackerNews;
                timer.AutoReset = true;
                timer.Enabled = true;
            }
        }

        private static void fetchFromhackerNews(object sender, ElapsedEventArgs e)
        {
            // Fetch from hacker news
            throw new NotImplementedException();
        }
    }
}
