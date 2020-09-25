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
    public class RowParentDto
    {
        public RowChildDto Row1 { get; set; }
        public RowChildDto Row2 { get; set; }
    }
    public class RowChildDto
    {
        public int GlueID { get; set; }
        public CellInfoDto Supplier { get; set; }
        public CellInfoDto GlueName { get; set; }
        public List<CellInfoDto> CellsCenter { get; set; }
        public CellInfoDto Actual { get; set; }
        public CellInfoDto Count { get; set; }

    }
   
    public class CellInfoDto
    {
        public CellInfoDto()
        {
            this.editable = false;
        }

        public string GlueName { get; set; }
        public string Supplier { get; set; }
        public object lineID { get; set; }
        public object line { get; set; }
        public object value { get; set; }
        public object count { get; set; }
        public bool editable { get; set; }
        public double maxReal { get; set; }
        public string real { get; set; }
        public double delivered { get; set; }
        public double deliveredTotal { get; set; }
        public double consumption { get; set; }
        public List<DeliveredInfo> deliveredInfos { get; set; } = new List<DeliveredInfo>();
    }

}
