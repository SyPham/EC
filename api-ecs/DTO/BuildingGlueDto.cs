using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class BuildingGlueDto
    {
        public int ID { get; set; }
        public string Qty { get; set; }
        public int BuildingID { get; set; }
        public int GlueID { get; set; }
        public string GlueName { get; set; }
        public string BuildingName { get; set; }
        public int CreatedBy { get; set; }
        public int MixingInfoID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
