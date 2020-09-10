using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class HeaderForSummary
    {
        public string field  { get; set; }
    }
    public class SummaryInfo
    {
        public SummaryInfo()
        {
            this.editable = false;
        }

        public string GlueName { get; set; }
        public object glueID { get; set; }
        public object lineID { get; set; }
        public object line { get; set; }
        public object value { get; set; }
        public object count { get; set; }
        public bool editable { get; set; }
        public double maxReal { get; set; }
        public double delivered { get; set; }
        public double consumption { get; set; }
    }
    public class GlueInfo {
        public string GlueName { get; set; }
        public string BPFC { get; set; }
    }

}
