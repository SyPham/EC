using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class HeaderForSummary
    {
        public string field  { get; set; }
        public List<SummaryInfo> summaryInfo  { get; set; }
        public object count { get; set; }
        public object real { get; set; }
    }
    public class SummaryInfo
    {
        public SummaryInfo()
        {
            this.editable = false;
        }

        public object glueName { get; set; }
        public object glueID { get; set; }
        public object lineID { get; set; }
        public object line { get; set; }
        public object value { get; set; }
        public object count { get; set; }
        public bool editable { get; set; }
    }
}
