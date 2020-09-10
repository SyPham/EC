using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class PlanDetail
    {
        public PlanDetail()
        {
        }

        public int ID { get; set; }
        public string GlueName { get; set; }
        public string BPFCName { get; set; }
        public int GlueID { get; set; }
        public string Supplier { get; set; }
        public double Consumption { get; set; }
        public int PlanID { get; set; }
        public Plan Plan { get; set; }
    }
}
