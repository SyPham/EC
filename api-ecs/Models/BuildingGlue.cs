using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class BuildingGlue
    {
        public BuildingGlue()
        {
            CreatedDate = DateTime.Now;
        }

        [Key ]
        public int ID { get; set; }
        public string Qty { get; set; }
        public int BuildingID { get; set; }
        public int GlueID { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
