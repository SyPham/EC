using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class SummaryDto
    {
        public int GlueID { get; set; }
        public int BuildingID { get; set; }
        public string GlueName { get; set; }
        public int ModelNameID { get; set; }
        public int WorkingHour { get; set; }
        public int HourlyOutput { get; set; }
        public string BuildingName { get; set; }
        public string Comsumption { get; set; }
    }

}
