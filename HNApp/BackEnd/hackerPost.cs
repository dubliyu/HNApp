using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HNApp.BackEnd
{
    public class HackerPost
    {
#pragma warning disable IDE1006 // Naming Styles
        public int id { get; set; }
        public int score { get; set; }

        public string by { get; set; }
        public string url { get; set; }
        public string type { get; set; }
        public string title { get; set; }
#pragma warning restore IDE1006 // Naming Styles

    }
}
